package PBL6.example.UNIME.configuration;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

public class UserGenerator {

    private final PasswordEncoder passwordEncoder;

    public UserGenerator() {
        // Sử dụng BCryptPasswordEncoder để mã hóa mật khẩu
        this.passwordEncoder = new BCryptPasswordEncoder(10);
    }

    public List<User> generateUsers() {
        List<User> users = new ArrayList<>();
        // Add danh sách người dùng
        String[][] userData = {
//                {"pa_anh", "anh1234#", "anh@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_ruttml.jpg"},
//                {"pa_bao", "bao1234#", "bao@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa1_wjygvu.jpg"},
//                {"pa_cuong", "cuong1234#", "cuong@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242271/pa6_kacpe9.jpg"},
//                {"pa_danh", "danh1234#", "danh@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242271/pa7_kwuqww.jpg"},
//                {"pa_giang", "giang1234#", "giang@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa3_aao2ah.jpg"},
//                {"pa_tan", "tan1234#", "tan@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242268/pa8_r9rkoh.jpg"},
//                {"pa_duc", "duc1234#", "duc@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242268/pa9_tdn3vr.jpg"},
//                {"pa_hue", "hue1234#", "hue@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242272/pa4_fwpehi.jpg"},
//                {"pa_chinh", "chinh1234#", "chinh@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa10_bcgrhx.jpg"},
//                {"pa_nhung", "nhung1234#", "nhung@gmail.com", "PATIENT", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242272/pa5_wbufsg.jpg"},
//
//                {"em_quan", "quan1234#", "quan@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg"},
//                {"em_trung", "trung1234#", "trung@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242272/pa5_wbufsg.jpg"},
//                {"em_khanh", "khanh1234#", "quoc@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242260/pa17_q82v5g.jpg"},
//                {"em_lac", "lac1234#", "lac@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242265/pa12_lc3xry.jpg"},
//                {"em_linh", "linh1234#", "linh@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242264/pa13_xrkes1.jpg"},
//                {"em_luong", "luong1234#", "luong@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242263/pa15_ujr1bn.jpg"},
//                {"em_tham", "thang1234#", "tham@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242263/pa16_wx2amq.jpg"},
//                {"em_anh", "anh1234#", "viet@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242259/pa18_chzhoo.jpg"},
//                {"em_phuong", "phuong1234#", "phuong@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242259/pa19_ofppky.jpg"},
//                {"em_tu", "tu1234#", "tu@gmail.com", "EMPLOYEE", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242259/pa20_k6cnbr.jpg"},
//
//                {"doc_khai", "khai1234#", "khai@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc4_rvnhzx.jpg"},
//                {"doc_hoang", "hoang1234#", "hoang@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc6_drk8g8.jpg"},
//                {"doc_anh", "anh1234#", "anhdoc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc2_dpk9gm.jpg"},
//                {"doc_ly", "ly1234#", "ly@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc5_zfcris.jpg"},
//                {"doc_phuc", "phuc1234#", "phuc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc6_drk8g8.jpg"},
//                {"doc_quan", "quan1234#", "quandoc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc7_nndmxf.jpg"},
//                {"doc_hieu", "hieu1234#", "hieu@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc9_pozgu9.jpg"},
//                {"doc_van", "van1234#", "van@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc8_rzalke.jpg"},
//                {"doc_loc", "loc1234#", "loc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc10_nowqn6.jpg"},
//                {"doc_tu", "tu1234#", "tudoc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241976/doc8_rzalke.jpg"}
                {"doc_trung", "trung1234#", "trung@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc11_qwerty.jpg"},
                {"doc_minh", "minh1234#", "minh@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc12_asdfgh.jpg"},
                {"doc_hai", "hai1234#", "hai@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc13_zxcvbn.jpg"},
                {"doc_dung", "dung1234#", "dung@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc14_plokmn.jpg"},
                {"doc_hoa", "hoa1234#", "hoa@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc15_uytrew.jpg"},
                {"doc_binh", "binh1234#", "binh@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc16_oiuytr.jpg"},
                {"doc_hung", "hung1234#", "hung@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc17_wedrtg.jpg"},
                {"doc_nhan", "nhan1234#", "nhan@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc18_qazwsx.jpg"},
                {"doc_tam", "tam1234#", "tam@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc19_bgtres.jpg"},
                {"doc_linh", "linh1234#", "linh@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc20_loiknj.jpg"},
                {"doc_hue", "hue1234#", "hue@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc21_mnbvcx.jpg"},
                {"doc_loan", "loan1234#", "loan@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc22_lkjhgf.jpg"},
                {"doc_thanh", "thanh1234#", "thanh@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc23_asdfrv.jpg"},
                {"doc_vu", "vu1234#", "vu@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc24_oiuytg.jpg"},
                {"doc_dai", "dai1234#", "dai@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc25_plkjoz.jpg"},
                {"doc_tien", "tien1234#", "tien@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc26_lkjpol.jpg"},
                {"doc_quoc", "quoc1234#", "quoc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc27_zxcvpl.jpg"},
                {"doc_phong", "phong1234#", "phong@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc28_asdert.jpg"},
                {"doc_hiep", "hiep1234#", "hiep@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc29_qwerty.jpg"},
                {"doc_ngoc", "ngoc1234#", "ngoc@gmail.com", "DOCTOR", "https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731241977/doc30_asdfgh.jpg"}

        };

        for (String[] data : userData) {
            users.add(new User(data[0], data[1], data[2], data[3], data[4]));
        }
        return users;
    }

    public void printEncodedUsers() {
        List<User> users = generateUsers();
        for (User user : users) {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            System.out.printf(
                    "('%s', '%s', '%s', '%s', '%s'),%n",
                    user.getUsername(), encodedPassword, user.getEmail(), user.getRole(), user.getImage()
            );
        }
    }

    public static class User {
        private String username;
        private String password;
        private String email;
        private String role;
        private String image;

        public User(String username, String password, String email, String role, String image) {
            this.username = username;
            this.password = password;
            this.email = email;
            this.role = role;
            this.image = image;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getEmail() {
            return email;
        }

        public String getRole() {
            return role;
        }

        public String getImage() {
            return image;
        }
    }

    public static void main(String[] args) {
        UserGenerator generator = new UserGenerator();
        generator.printEncodedUsers();
    }
}
