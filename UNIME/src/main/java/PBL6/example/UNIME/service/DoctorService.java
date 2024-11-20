package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.DoctorRequest;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.entity.*;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.DoctorDetailRepository;
import PBL6.example.UNIME.repository.DoctorRepository;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DoctorService {
    private static final Logger log = LoggerFactory.getLogger(DoctorService.class);

    DoctorRepository doctorRespository;
    UserService userService;
    private final DepartmentService departmentService;
    private final DoctorDetailRepository doctorDetailRespository;

    @PreAuthorize("hasRole('ADMIN')")
    public DoctorResponse createDoctor(@Valid DoctorRequest request) {
        // Tìm department có tồn tại
        Department department = departmentService.getDepartmentByName(request.getDepartmentName());

        //1. kiểm tra, khởi tạo user
        User user = new User();
        user.setUsername(request.getDoctorUsername());
        user.setPassword(request.getDoctorPassword());
        user.setEmail(request.getDoctorEmail());
        if(request.getDoctorImage() == null){
            user.setImage("https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731150727/e3e8df1e56e1c8839457b42bdcd750e5_smkmhm.jpg");
        } else  user.setImage(request.getDoctorImage());
        user.setRole(Role.DOCTOR.name());


        DoctorDetail detail = new DoctorDetail();
        detail.setDoctordetailExperience(request.getDoctordetailExperience());
        detail.setDoctordetailInformation(request.getDoctordetailInformation());
        detail.setDoctordetailAwardRecognization(request.getDoctordetailAwardRecognization());
        doctorDetailRespository.save(detail);

        // 2. Tạo Employee
        Doctor doctor = new Doctor();
        doctor.setDoctorUserId(userService.createUser(user));
        doctor.setDoctorName(request.getDoctorName());
        doctor.setDoctorPhoneNumber(request.getDoctorPhoneNumber());
        doctor.setDoctorGender(request.isDoctorGender());
        doctor.setDoctorAddress(request.getDoctorAddress());
        doctor.setDoctorStatus("ON");
        doctor.setDepartment(department);
        doctor.setDoctorDetail(detail);

        return mapToResponse(doctorRespository.save(doctor));
    }
    @PreAuthorize("hasRole('ADMIN')")
    public DoctorResponse updateByAdmin(Integer doctor_id, DoctorRequest request) {
        //1.
        Doctor doctor = doctorRespository.findById(doctor_id)
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));

        //2.
        Department department = departmentService.getDepartmentByName(request.getDepartmentName());

        //3.
        doctor.setDepartment(department);
        doctor.setDoctorStatus(request.getDoctorStatus());

        return mapToResponse(doctorRespository.save(doctor));
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDoctor(Integer doctor_id) {
        Doctor doctor = doctorRespository.findById(doctor_id)
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));

        doctorRespository.delete(doctor);
        userService.deleteUser(doctor.getDoctorUserId().getUserId());
    }
    @PreAuthorize("hasRole('ADMIN')")
    public DoctorResponse getDoctorById(Integer doctorId) {
        return mapToResponse(doctorRespository.findById(doctorId)
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND)));
    }

    // token
    public DoctorResponse getMyInfo(String Username) {

        User user = userService.getUserByUsername(Username);
        Doctor doctor = doctorRespository.findBydoctorUserId(user)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXITED));

        return mapToResponse(doctor);
    }
    //token
    public DoctorResponse updateMyInfo(String doctor_username, DoctorRequest request) {
        Doctor doctor = doctorRespository.findBydoctorUserId(userService.getUserByUsername(doctor_username))
                .orElseThrow(()-> new AppException(ErrorCode.DOCTORS_NOT_FOUND));

        //1. cập nhật User
        User user = new User();
        user.setPassword(request.getDoctorPassword());
        user.setEmail(request.getDoctorEmail());
        user.setImage(request.getDoctorImage());
        userService.updateUser(doctor.getDoctorUserId().getUserId(), user);

        //2. cập nhật doctorDetail
        DoctorDetail detail = doctor.getDoctorDetail();
        detail.setDoctordetailExperience(request.getDoctordetailExperience());
        detail.setDoctordetailInformation(request.getDoctordetailInformation());
        detail.setDoctordetailAwardRecognization(request.getDoctordetailAwardRecognization());
        doctorDetailRespository.save(detail);

        //3. cập nhật doctor
        doctor.setDoctorName(request.getDoctorName());
        doctor.setDoctorPhoneNumber(request.getDoctorPhoneNumber());
        doctor.setDoctorGender(request.isDoctorGender());
        doctor.setDoctorAddress(request.getDoctorAddress());
        doctor.setDoctorDetail(detail);

        return mapToResponse(doctorRespository.save(doctor));
    }


    // public
    public List<DoctorResponse> getAllDoctors() {
        List<Doctor> doctors = doctorRespository.findAll();
        return doctors.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    // public
    public List<DoctorResponse> getDoctorByName(String doctorName) {
        List<Doctor> resultList = doctorRespository.findByDoctorNameContaining(doctorName);
        if (resultList.isEmpty()) {throw new AppException(ErrorCode.DOCTORS_NOT_FOUND);}
        return resultList.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private DoctorResponse mapToResponse(Doctor doctor) {
        return new DoctorResponse(
                doctor.getDoctorId(),

                doctor.getDoctorUserId().getUsername(),
                doctor.getDoctorUserId().getPassword(),
                doctor.getDoctorUserId().getEmail(),
                doctor.getDoctorUserId().getImage(),

                doctor.getDoctorName(),
                doctor.getDoctorAddress(),
                doctor.getDoctorPhoneNumber(),
                doctor.isDoctorGender(),
                doctor.getDoctorDateOfBirth(),

                doctor.getDepartment().getDepartmentName(),
                doctor.getDoctorStatus(),

                doctor.getDoctorDetail().getDoctordetailInformation(),
                doctor.getDoctorDetail().getDoctordetailExperience(),
                doctor.getDoctorDetail().getDoctordetailAwardRecognization());
    }
}
