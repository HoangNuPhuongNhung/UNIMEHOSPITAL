USE unimehospital;
ALTER TABLE patient DROP COLUMN patient_image ;
ALTER TABLE doctor DROP COLUMN doctor_image;
ALTER TABLE employee DROP COLUMN employee_image;
ALTER Table service ADD service_image  VARCHAR(255) Not NULL ;
ALTER TABLE user ADD user_image VARCHAR(255) NOT NULL;
