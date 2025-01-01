package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.DoctorTimeworkCreateRequest;
import PBL6.example.UNIME.dto.response.DoctorTimeworkResponse;
import PBL6.example.UNIME.entity.*;
import PBL6.example.UNIME.enums.DoctorTimeworkStatus;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;
import java.time.temporal.WeekFields;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableScheduling
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class DoctorTimeworkServiceImpl implements DoctorTimeworkService {

    DoctorTimeworkRepository doctorTimeworkRepository;
    DoctorServiceImpl doctorService;
    @PersistenceContext
    private EntityManager entityManager;
    EmployeeService employeeService;
    private final DoctorRepository doctorRepository;
    private final TimeworkRespository timeworkRespository;

    public void createDoctorTimework(String  username, List<DoctorTimeworkCreateRequest> requests) {
        Doctor doctor = doctorService.getDoctorByUsername(username);
        List<DoctorTimework> doctorTimeworkList = new ArrayList<>();
        for(DoctorTimeworkCreateRequest request : requests) {
            doctorTimeworkList.add(maptoDoctorTimework(doctor,request));
        }
        doctorTimeworkRepository.saveAll(doctorTimeworkList);
    }

    @Scheduled(cron = "0 0 * * * SUN")
//    @Scheduled(fixedRate = 60000)
    public void checkAndAutoCreateDoctorTimework() {
        int year = LocalDate.now().plusDays(14).getYear();
        int week = LocalDate.now().plusDays(14).get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        log.info("week: {} ___year:  {}", week, year);
        List<Doctor> doctorsWithoutSchedule = getDoctorsWithoutSchedule(week, year);
        log.info("doctorsWithoutSchedule: "+ doctorsWithoutSchedule.size());

        for(Doctor doctor : doctorsWithoutSchedule) {
            AutoCreateDoctorTimework(week, year, doctor);
        }
    }

    public String updateDoctorTimework(Integer doctorTimeworkId , String doctorTimeworkStatus) {

        DoctorTimework doctorTimework = doctorTimeworkRepository.findById(doctorTimeworkId).
                orElseThrow(()->new AppException(ErrorCode.DOCTORTIMEWORK_NOT_FOUND));

        if(!DoctorTimeworkStatus.contains(doctorTimeworkStatus)) throw new AppException(ErrorCode.INVALID_KEY);
        doctorTimework.setStatus(doctorTimeworkStatus);
        doctorTimeworkRepository.save(doctorTimework);

        return "Thanh cong";
    }

    public List<DoctorTimeworkResponse> getAllDoctorTimeworkByWeek(String username, String week_year) {
        String[] strings = week_year.split("_");
        Integer year = Integer.valueOf(strings[1]);
        Integer week = Integer.valueOf(strings[0]);
        Employee employee = employeeService.getEmployeeByUsername(username);
        log.info("getAllDoctorTimeworkByWeek");
        return doctorTimeworkRepository.findByWeek(week, year)
                .stream()
                .filter(dt -> dt.getDoctor().getDepartment().equals(employee.getDepartment()))
                .map(this::mapToDoctorTimeworkResponse)
                .collect(Collectors.toList());
    }

    public List<DoctorTimeworkResponse> getListAvailableTimeworkOfDoctor(Integer doctorId) {
        LocalDate today = LocalDate.now();
        int week = today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        int year = (week==1 && today.getDayOfMonth()>20)? today.getYear()+1: today.getYear() ;
        LocalDate afDay = LocalDate.now().plusWeeks(1);
        int nextWeek = afDay.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        int nextYear = (nextWeek==1 && afDay.getDayOfMonth()>20)? afDay.getYear()+1: afDay.getYear() ;

        log.info("week: {} ___year: {}", week, year);
        log.info("nextWeek: {}  ___nextYear: {}", nextWeek, nextYear);
        log.info("doctorID: {}", doctorId);

        List<DoctorTimework> list = doctorTimeworkRepository.findByWeek(week, year)
                .stream()
                .filter(dt -> dt.getDoctor().getDoctorId().equals(doctorId))
                .filter(dt -> dt.getStatus().equals(DoctorTimeworkStatus.Available.name()))
                .collect(Collectors.toList());

        list.addAll(doctorTimeworkRepository.findByWeek(nextWeek, nextYear)
                .stream()
                .filter(dt -> dt.getDoctor().getDoctorId().equals(doctorId))
                .filter(dt -> dt.getStatus().equals(DoctorTimeworkStatus.Available.name()))
                .toList());

        return list.stream()
                .map(this::mapToDoctorTimeworkResponse)
                .collect(Collectors.toList());

    }

    @Override
    public List<DoctorTimeworkResponse> getListTimeworkOfDoctor(String username) {
        LocalDate today = LocalDate.now();
        int week1 = today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        int year1 = (week1==1 && today.getDayOfMonth()>20)? today.getYear()+1: today.getYear();

        int year2 = today.plusWeeks(1).getYear();
        int week2 = today.plusWeeks(1).get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);

        int year3 = today.plusWeeks(2).getYear();
        int week3 = today.plusWeeks(2).get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);


        log.info("week: {} ___year: {}", week1, year1);
        log.info("nextWeek: {}  ___nextYear: {}", week2, year2);

        List<DoctorTimework> list = new ArrayList<>();

        list.addAll(getDoctorTimeworkForWeek(year1, week1,username));
        list.addAll(getDoctorTimeworkForWeek(year2, week2,username));
        list.addAll(getDoctorTimeworkForWeek(year3, week3,username));

        return list.stream()
                .map(this::mapToDoctorTimeworkResponse)
                .collect(Collectors.toList());
    }
    private List<DoctorTimework> getDoctorTimeworkForWeek(int year, int week,String username) {
        return doctorTimeworkRepository.findByWeek(week, year)
                .stream()
                .filter(dt -> dt.getDoctor().getDoctorUserId().getUsername().equals(username))
                .collect(Collectors.toList());
    }

//    @Scheduled(fixedRate = 600000)
    @Scheduled(cron = "0 0 1 * * MON")
    public void deleteDoctorTimework() {
        List<DoctorTimework> allDoctorTimework = doctorTimeworkRepository.findAll();
        LocalDate today = LocalDate.now().minusDays(1);
        int year = today.getYear();
        int week = today.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        for (DoctorTimework doctorTimework : allDoctorTimework) {
            if(doctorTimework.getYear()<year) doctorTimeworkRepository.delete(doctorTimework);
            else if (doctorTimework.getWeekOfYear()<week && doctorTimework.getYear()==year) doctorTimeworkRepository.delete(doctorTimework);
        }
    }


    private DoctorTimeworkResponse mapToDoctorTimeworkResponse(DoctorTimework doctorTimework) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
        return DoctorTimeworkResponse.builder()
                .doctorTimeworkId(doctorTimework.getId())
                .doctorTimeworkYear(doctorTimework.getYear())
                .weekOfYear(doctorTimework.getWeekOfYear())
                .dayOfWeek(doctorTimework.getTimeWork().getDayOfWeek())
                .startTime(doctorTimework.getTimeWork().getStartTime().format(dtf))
                .endTime(doctorTimework.getTimeWork().getEndTime().format(dtf))
                .doctorId(doctorTimework.getDoctor().getDoctorId())
                .doctorName(doctorTimework.getDoctor().getDoctorName())
                .doctorTimeworkStatus(doctorTimework.getStatus())
                .build();
    }

    private void AutoCreateDoctorTimework(int week, int year, Doctor doctor) {
        List<Timework> timeworks = timeworkRespository.findAll();
        List<DoctorTimework> doctorTimeworkList = new ArrayList<>();

        for(Timework timework : timeworks) {
            doctorTimeworkList.add(DoctorTimework.builder()
                    .year(year)
                    .weekOfYear(week)
                    .timeWork(timework)
                    .doctor(doctor)
                    .status(DoctorTimeworkStatus.Available.name())
                    .build());

        }
        doctorTimeworkRepository.saveAll(doctorTimeworkList);
    }

    private List<Doctor> getDoctorsWithoutSchedule (Integer week, Integer year) {
        List<Doctor> allDoctors = doctorRepository.findAll();
        log.info("allDoctors: "+ allDoctors.size());

        List<Doctor> doctorsWithSchedule = doctorTimeworkRepository.findByWeek(week,year)
                .stream()
                .map(DoctorTimework::getDoctor)
                .distinct()
                .toList();
        log.info("doctorsWithSchedule: "+ doctorsWithSchedule.size());

        return allDoctors.stream()
                .filter(doctor -> !doctorsWithSchedule.contains(doctor))
                .toList();
    }


    private  DoctorTimework  maptoDoctorTimework(Doctor doctor,  DoctorTimeworkCreateRequest dtRequest ){
        Timework timework = entityManager.getReference(Timework.class, dtRequest.getTimework_id());
        return DoctorTimework.builder()
                .year(dtRequest.getDoctorTimeworkYear())
                .weekOfYear(dtRequest.getWeekOfYear())
                .timeWork(timework)
                .doctor(doctor)
                .status(dtRequest.getDoctorTimeworkStatus())
                .build();
    }



}