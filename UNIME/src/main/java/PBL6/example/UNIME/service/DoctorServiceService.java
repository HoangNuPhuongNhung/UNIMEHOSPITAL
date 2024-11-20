package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.DoctorServiceRequest;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.dto.response.ServiceResponse;
import PBL6.example.UNIME.entity.Doctor;
import PBL6.example.UNIME.entity.DoctorService;
import PBL6.example.UNIME.entity.Employee;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.DoctorRepository;
import PBL6.example.UNIME.repository.DoctorServiceRepository;
import PBL6.example.UNIME.repository.EmployeeRepository;
import PBL6.example.UNIME.repository.ServiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class DoctorServiceService {
    DoctorServiceRepository doctorServiceRepository;
    DoctorRepository doctorRepository;
    ServiceRepository serviceRepository;
    EmployeeService employeeService;
    private final ServiceService serviceService;
    private final UserService userService;
    private final EmployeeRepository employeeRepository;
    private final PBL6.example.UNIME.service.DoctorService doctorService;

    public List<DoctorResponse> addDoctorForService(String username, DoctorServiceRequest request) {
        checkEmployeeDepartmentAccess(username, request.getServiceID());

        // Lấy service và doctor từ request
        PBL6.example.UNIME.entity.Service service = serviceRepository.findById(request.getServiceID())
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
        Doctor doctor = doctorRepository.findById(request.getDoctorID())
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));

        // 2. Kiểm tra xem doctor và service đã tồn tại trong DoctorService chưa
        DoctorService existingDoctorService = doctorServiceRepository.findByDoctorAndService(doctor, service);
        if (existingDoctorService != null) {
            throw new AppException(ErrorCode.DOCTORSERVICE_EXITED);
        }

        DoctorService doctorService = new DoctorService();
        doctorService.setDoctor(doctor);
        doctorService.setService(service);
        doctorServiceRepository.save(doctorService);

        return getDoctorByService(request.getServiceID());
    }

    public List<DoctorResponse> delDoctorForSerVice(String username, DoctorServiceRequest request) {
        checkEmployeeDepartmentAccess(username, request.getServiceID());

        PBL6.example.UNIME.entity.Service service = serviceRepository.findById(request.getServiceID())
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
        Doctor doctor = doctorRepository.findById(request.getDoctorID())
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));

        DoctorService doctorService = doctorServiceRepository.findByDoctorAndService(doctor, service);
        if (doctorService == null) throw new AppException(ErrorCode.DOCTORSERVICE_NOT_FOUND);

        doctorServiceRepository.deleteById(doctorService.getDoctorserviceId());

        return  getDoctorByService(request.getServiceID());
    }


    // ===========
    public List<ServiceResponse> getServicesByDoctorId(Integer doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));
        List<PBL6.example.UNIME.entity.DoctorService> doctorServices = doctorServiceRepository.findBydoctor(doctor);

        // Lấy danh sách Service từ danh sách DoctorService
        return doctorServices.stream()
                .map(DoctorService::getService)
                .map(this::mapToServiceResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorResponse> getDoctorByService(Integer serviceId) {
        PBL6.example.UNIME.entity.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
        List<PBL6.example.UNIME.entity.DoctorService> doctorServices = doctorServiceRepository.findByservice(service);

        // Lấy danh sách Service từ danh sách DoctorService
        return doctorServices.stream()
                .map(DoctorService::getDoctor)
                .map(this::mapToDoctorResponse)
                .collect(Collectors.toList());
    }


    private void checkEmployeeDepartmentAccess(String username, Integer serviceId) {
        // 1. Kiểm tra người truy cập là employee không
        log.info(" trước kta  Role");

        User user = userService.getUserByUsername(username);
        log.info(" {} == {}",user.getRole(),Role.EMPLOYEE.name() );
        if (!user.getRole().equals(Role.EMPLOYEE.name())) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }
        log.info(" trước kta  phòng ban");
        // Lấy phòng ban của employee và service
        Integer employeeDepartmentId = employeeService.getDepartmentIdByUser(user);

        PBL6.example.UNIME.entity.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));

        if (!employeeDepartmentId.equals(service.getDepartment().getDepartmentId())) {
            throw new AppException(ErrorCode.FORBIDDEN);
        }
    }
    public DoctorResponse mapToDoctorResponse(Doctor doctor) {
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
    private ServiceResponse mapToServiceResponse(PBL6.example.UNIME.entity.Service service) {
        return new ServiceResponse(
                service.getServiceId(),
                service.getServiceName(),
                service.getServiceImage(),
                service.getServiceDescription(),
                service.getServicePrice(),
                service.getDepartment().getDepartmentName()
        );
    }

}
