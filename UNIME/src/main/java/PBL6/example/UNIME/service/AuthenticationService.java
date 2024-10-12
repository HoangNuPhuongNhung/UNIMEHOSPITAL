package PBL6.example.UNIME.service;


import PBL6.example.UNIME.dto.request.IntrospectRequest;
import PBL6.example.UNIME.dto.response.AuthenticationResponse;
import PBL6.example.UNIME.dto.response.IntrospectResponse;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.PatientRepository;
import PBL6.example.UNIME.dto.request.AuthenticationRequest;
import PBL6.example.UNIME.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        // 1. Tìm kiếm tài khoản
        var user = userRepository.findByusername(request.getUsername())
                .orElseThrow(()->  new AppException(ErrorCode.USER_NOT_EXITED)); // lỗi ko tìm ra username
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        // 2. kiểm tra password
        boolean authentication = passwordEncoder.matches(request.getPassword(),
                user.getPassword());
        if (!authentication) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);// lỗi pw ko đúng
        }

        // 3. tạo token
        var token = generateToken(user.getUsername());

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String generateToken(String username ) {

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); // sử dụng thuật toán HMAC với độ dài 512 bit để ký JWS.

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder().
                subject(username).
                issuer("devteria.com").
                issueTime(new Date()).
                expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                )).
                claim("username", username).
                build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return IntrospectResponse.builder()
                .valid(verified && expiryTime.after(new Date()))
                .build();
    }
}
