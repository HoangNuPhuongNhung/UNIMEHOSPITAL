package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.TimeworkRequest;
import PBL6.example.UNIME.dto.response.TimeworkResponse;
import PBL6.example.UNIME.entity.Timework;
import PBL6.example.UNIME.enums.DayOfWeek;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.TimeworkRespository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Indexed;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class TimeworkService {
    TimeworkRespository timeworkRespository;

    @PreAuthorize("hasRole('ADMIN')")
    public TimeworkResponse createTimework(TimeworkRequest request) {
        DayOfWeek dow = parseDayOfWeek(request.getDayOfWeek());
        LocalTime startTime = parseTime(request.getStartTime());
        LocalTime endTime = parseTime(request.getEndTime());

        if (timeworkRespository.findByDayOfWeekAndStartTimeAndEndTime(dow, startTime, endTime) != null) {
            throw new AppException(ErrorCode.TIMEWORK_EXITED);
        }

        Timework timework = new Timework();
        timework.setDayOfWeek(dow);
        timework.setStartTime(startTime);
        timework.setEndTime(endTime);

        return mapToResponse(timeworkRespository.save(timework));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public TimeworkResponse getTimeworkById(Integer timeworkId) {
        return mapToResponse(timeworkRespository.findById(timeworkId)
                .orElseThrow(() -> new AppException(ErrorCode.TIMEWORK_NOT_FOUND)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public TimeworkResponse updateTimework(Integer timeworkId, TimeworkRequest request) {
        DayOfWeek dow = parseDayOfWeek(request.getDayOfWeek());
        LocalTime startTime = parseTime(request.getStartTime());
        LocalTime endTime = parseTime(request.getEndTime());


        // Kiểm tra nếu đã có Timework với dayOfWeek và startTime này
        Timework timeworkBequest = timeworkRespository.findByDayOfWeekAndStartTimeAndEndTime(dow, startTime, endTime);
        if (timeworkBequest != null) {
            if(timeworkBequest.getId().equals(timeworkId)) {}
        }

        Timework timeworkById = timeworkRespository.findById(timeworkId)
                .orElseThrow(() -> new AppException(ErrorCode.TIMEWORK_NOT_FOUND));
        timeworkById.setDayOfWeek(dow);
        timeworkById.setStartTime(startTime);
        timeworkById.setEndTime(endTime);

        return mapToResponse(timeworkRespository.save(timeworkById));

    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTimework(Integer timeworkId) {
        Timework timework = timeworkRespository.findById(timeworkId)
                .orElseThrow(() -> new AppException(ErrorCode.TIMEWORK_NOT_FOUND));
        timeworkRespository.deleteById(timeworkId);
    }
// ===== PUBLIC
    public List<TimeworkResponse> getAllTimeworks() {
        List<Timework> timeworks = timeworkRespository.findAll();
        return timeworks.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public Timework getTimeworkByInfo(DayOfWeek dow, LocalTime startTime, LocalTime endTime) {
        return timeworkRespository.findByDayOfWeekAndStartTimeAndEndTime(dow,startTime,endTime);
    }
    //============
    private TimeworkResponse mapToResponse(Timework timework) {
        return new TimeworkResponse(
                timework.getId(),
                timework.getDayOfWeek().toString(),
                timework.getStartTime().toString(),
                timework.getEndTime().toString()
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
