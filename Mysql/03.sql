-- 02.sql --> Liên quan đến timework
-- DOCTOR_TIMEWORK, TIMEWORK
use UnimeHospital;

-- KDL YEAR có giá trị khoảng 1901 - 2155
create table TIMEWORK(
	timework_id INT PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT CHECK_TIMEWORK_DAY CHECK  (day_of_week IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'))
);
-- use UnimeHospital;
-- ALTER TABLE TIMEWORK
-- DROP CONSTRAINT CHECK_TIMEWORK_DAY;
-- ALTER TABLE TIMEWORK
-- ADD CONSTRAINT CHECK_TIMEWORK_DAY CHECK (day_of_week IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'));


create table DOCTOR_TIMEWORK(
	doctortimework_id INT PRIMARY KEY AUTO_INCREMENT,
	doctortimework_year  INT NOT NULL,
    week_of_year INT NOT NULL,
    timework_id INT NOT NULL,
    doctor_id INT NOT NULL,
    doctortimework_status VARCHAR(255) DEFAULT 'Available' NOT NULL,
    CONSTRAINT UNQ_DOCTOR_TIMEWORK UNIQUE(doctortimework_year, week_of_year, timework_id, doctor_id),
    CONSTRAINT CHECK_DOCTOR_TIMEWORK_STATUS CHECK (doctortimework_status IN ('Available', 'Busy')),
    CONSTRAINT CHECK_WEEK_OF_YEAR CHECK (week_of_year >= 0 AND week_of_year < 54),
	CONSTRAINT FK_DOCTOR_TIMEWORK_TIMEWORK FOREIGN KEY (timework_id)
									  REFERENCES TIMEWORK(timework_id),
    CONSTRAINT FK_DOCTOR_TIMEWORK_DOCTOR FOREIGN KEY (doctor_id)
									  REFERENCES DOCTOR(doctor_id)                                   
    
);
use UnimeHospital;
-- ALTER TABLE doctor_timework 
-- MODIFY COLUMN doctortimework_year INT NOT NULL;