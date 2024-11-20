package PBL6.example.UNIME.repository;

import PBL6.example.UNIME.entity.Timework;
import PBL6.example.UNIME.enums.DayOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Optional;

@Repository
public interface TimeworkRespository extends JpaRepository<Timework,Integer> {
    Timework findByDayOfWeekAndStartTimeAndEndTime (DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime);

}
