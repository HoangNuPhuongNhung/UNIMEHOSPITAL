package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.DoctorServiceRequest;
import PBL6.example.UNIME.dto.request.DoctorTimeworkRequest;
import PBL6.example.UNIME.dto.response.DoctorResponse;
import PBL6.example.UNIME.dto.response.DoctorTimeworkResponse;
import PBL6.example.UNIME.dto.response.ServiceResponse;
import PBL6.example.UNIME.entity.*;
import PBL6.example.UNIME.entity.DoctorService;
import PBL6.example.UNIME.enums.DayOfWeek;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class DoctorTimeworkService {
    DoctorServiceRepository doctorServiceRepository;
    DoctorRepository doctorRepository;
    ServiceRepository serviceRepository;
    EmployeeService employeeService;
    private final ServiceService serviceService;
    private final UserService userService;
    private final EmployeeRepository employeeRepository;
    private final PBL6.example.UNIME.service.DoctorService doctorService;
    private final TimeworkRespository timeworkRespository;
    private final TimeworkService timeworkService;
    private final DoctorTimeworkRepository doctorTimeworkRepository;

    public String createDoctorTimework(String username, DoctorTimeworkRequest request) {
        request.validateRequest();
        DayOfWeek dow = parseDayOfWeek(request.getDayOfWeek());
        LocalTime startTime = parseTime(request.getStartTime());
        LocalTime endTime = parseTime(request.getEndTime());

        Timework timework = timeworkService.getTimeworkByInfo(dow,startTime,endTime);
        if(timework == null) throw new AppException(ErrorCode.TIMEWORK_NOT_FOUND);


        DoctorTimework doctorTimework = new DoctorTimework();
        doctorTimework.setYear(request.getWeekOfYear());
        doctorTimework.setWeekOfYear(request.getWeekOfYear());
        doctorTimework.setTimeWork(timework);
        doctorTimework.setStatus(request.getDoctortimeworkStatus());
        doctorTimeworkRepository.save(doctorTimework);

        return "Thanh cong";
    }

//    public List<DoctorResponse> delDoctorForSerVice(String username, DoctorServiceRequest request) {
//        checkEmployeeDepartmentAccess(username, request.getServiceID());
//
//        PBL6.example.UNIME.entity.Service service = serviceRepository.findById(request.getServiceID())
//                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
//        Doctor doctor = doctorRepository.findById(request.getDoctorID())
//                .orElseThrow(() -> new AppException(ErrorCode.DOCTORS_NOT_FOUND));
//
//        DoctorService doctorService = doctorServiceRepository.findByDoctorAndService(doctor, service);
//        if (doctorService == null) throw new AppException(ErrorCode.DOCTORSERVICE_NOT_FOUND);
//
//        doctorServiceRepository.deleteById(doctorService.getDoctorserviceId());
//
//        return  getDoctorByService(request.getServiceID());
//    }




    private DoctorTimeworkResponse mapToServiceResponse(DoctorTimework doctorTimework) {
        return new DoctorTimeworkResponse(
                doctorTimework.getId(),
                doctorTimework.getYear(),
                doctorTimework.getWeekOfYear(),
                doctorTimework.getTimeWork().getDayOfWeek().name(),
                doctorTimework.getTimeWork().getStartTime().toString(),
                doctorTimework.getTimeWork().getEndTime().toString(),
                doctorTimework.getDoctor().getDoctorId(),
                doctorTimework.getStatus()
        );
    }

    public DayOfWeek parseDayOfWeek(String day) {
        try {
            return DayOfWeek.valueOf(day.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.INVALID_DAY);
        }
    }

    public static LocalTime parseTime(String startTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        try {
            return LocalTime.parse(startTime, formatter);
        } catch (DateTimeParseException e) {
            throw new AppException(ErrorCode.INVALID_TIME);
        }
    }
}
