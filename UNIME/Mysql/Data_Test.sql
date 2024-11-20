USE UnimeHospital;
-- disable foreign keys constraint
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE appointment;
TRUNCATE TABLE department;
TRUNCATE TABLE doctor;
TRUNCATE TABLE doctor_detail;
TRUNCATE TABLE doctor_service;
TRUNCATE TABLE doctor_timework;
TRUNCATE TABLE employee;
TRUNCATE TABLE patient;
TRUNCATE TABLE service;
TRUNCATE TABLE timework;
TRUNCATE TABLE user;

-- enable foreign keys constraint
SET FOREIGN_KEY_CHECKS = 1;
-- ================================================================ 
INSERT INTO department (department_name, department_description)
VALUES 
    ('Răng-Hàm-Mặt', 'CHăm sóc và điều trị các vấn đề về răng miệng và hàm mặt'),
    ('Tim Mạch', 'Chuyên Khám vÀ điều trị cáC bệnh lý về tim mạch'),
    ('Nội Tiết', 'Điều trị các bệnh về nội Tiết vÀ rối loạn hormOne'),
    ('Hô Hấp', 'Khám và điều trị các bệnh lý về đường hô hấp'),
    ('TiÊu Hóa', 'ChUyên điều trị các bệnh lý về tiêu hóa'),
    ('Thần Kinh', 'Chăm sóc Và điềU trị các bệnH về thần kinh'),
    ('Xương Khớp', 'Khám và điều trị cáC vấn đỀ về cơ xương Khớp'),
    ('Sản Phụ Khoa', 'Chuyên về các dịch vụ sản khoa VÀ phụ Khoa'),
    ('Nhi Khoa', 'Khám và điều trị các bệnh cho trẻ em'),
    ('Da Liễu', 'ChĂM sóc Và điều trị các vấn đề về da liễu'),
    ('Mắt', 'Chuyên điều trị các bệnh về MẮt'),
    ('Tai MŨi Họng', 'Khám và điều trị các bệnh lý về tai, mũi, Họng'),
    ('Ung Bướu', 'Chuyên điều trị các bệnh về ung bướu và ung thư'),
    ('Thận TIết Niệu', 'Khám và điều trị các bệnh lý về thận và đườnG tiết Niệu'),
    ('NgoạI Khoa', 'Điều trị các bệnh cần phẫu thuật'),
    ('Chấn Thương ChỈNh HìnH', 'Điều trị Chấn thương và các vấn đề chỉnh hình'),
    ('Phục Hồi Chức Năng', 'Hỗ trợ phục hồi chức năng sau chấn thương và bệnh tật'),
    ('Dinh Dưỡng', 'Tư vấn và điều trị các vấn đề về diNH dưỡnG'),
    ('Tâm Thần', 'Điều trị các rối loạn tâm thần và vấn đề tÂM lý'),
    ('Huyết Học', 'Chăm sóc và điều trị các bệnh lý về máu');

INSERT INTO service (service_name, DEpartmEnt_id, service_description, service_price, service_image)
VALUES 
    ('Khám răng miệng định kỳ', 1, 'KhÁM và lÀm sạch răng miệNg định kỳ', 300000, 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa11_hfy4fy.jpg'),
    ('Khám và siêu âm tim', 2, 'Khám tim mạch và thực hiệN siêu Âm tim', 500000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/PA11_HFY4fy.jpg'),
    ('Tư vấn nội tiết', 3, 'Tư vấn các bệnh về nỘi tiết và rối Loạn hormone', 400000, 'https://res.cloudinary.com/dy8p5yjsd/imaGe/Upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Khám phổI', 4, 'Khám và tư vấn các bệnh về đường hô hấp', 350000, 'https://res.cloudinary.com/dy8P5yjsd/Image/upload/v1731242267/pA11_hfy4fy.jpg'),
    ('Nội soi dạ dày', 5, 'Nội soi và đIỀU TRỊ các bệnh lý dạ dày', 600000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/V1731242267/pa11_hfy4fy.jpg'),
    ('Điều trị đau đầu', 6, 'Khám và điều trị các vấn đề về thần kinh vÀ ĐAU ĐẦU', 450000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hFY4fy.jPg'),
    ('KháM XƯơng khớp', 7, 'Kiểm tra và điều trị các vấn đề về xương khớP', 300000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpG'),
    ('Tư vấn sản phụ khoA', 8, 'Khám và tư vấn cho phụ nữ về các vấn đề sản phụ khoa', 400000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Khám tổng quát trẻ em', 9, 'Khám sức khỏe tổng quát và điều trị bệnh cho trẻ em', 250000, 'https://res.clOuDINARY.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Điều trị da liễu', 10, 'Điều trị các vấn đề về dA liễu như mụn, viêm da', 200000, 'https://res.cloudinary.com/dy8p5yjsD/IMAGE/Upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Khám mắt', 11, 'Kiểm tra và điều trị CÁc bệnH về mắt', 300000, 'https://rEs.Cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('ĐiỀu TRỊ VIêm họng', 12, 'Khám và điều trị các vấn đề về tai, mũi, họng', 220000, 'https://REs.cloUdinary.com/dy8p5yjsd/image/upLoAD/v1731242267/pa11_hfy4fy.jpg'),
    ('Khám và điều trị ung bướu', 13, 'CHẩN ĐOÁN và điều trị các bệnh về ung bướu', 800000, 'https://res.cloudinary.com/dy8p5yjsd/Image/Upload/v1731242267/pa11_hfY4FY.jpg'),
    ('Tư vấn thận và tiết niệu', 14, 'Khám và tư vấn các bệnh Về THẬN Và đường tiết niệu', 450000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fY.JPG'),
    ('Phẫu thuật ngoại khoa', 15, 'Thực hiện các pHẫU THUẬT ngoại khoa cần thiết', 1200000, 'https://res.cloudinary.com/dy8p5yjsd/image/uplOAd/v1731242267/pa11_hfy4fy.jpg'),
    ('Điều trị chấn thương', 16, 'Điều trị chấn thương và các vấn đề chỉNh HÌNH', 700000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4Fy.jpg'),
    ('Phục hồi chức năng sau chấn ThƯƠNg', 17, 'Giúp bệnh nhân phục hồi chức năng sau chấn thương', 600000, 'HTtps://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Tư vấn dinh dưỡng', 18, 'Cung cấp tư vấN VÀ điều trị các vấn đề về dinh dưỡng', 200000, 'https://res.cloudinary.com/dy8p5YJSD/Image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Điều trị tâm lý', 19, 'Điều trị Các vấN đề về tâm lý và tâm thần', 500000, 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242267/PA11_HFY4fy.jpg'),
    ('Điều trị rối loạn máu', 20, 'Chăm sóc và điều trị các bệnh lý vỀ máu', 650000, 'https://res.cloudinary.cOM/dy8p5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg');

INSERT INTO timework (day_of_week, start_time, end_time)
VALUES 
    ('MONDAY', '08:00:00', '09:00:00'),
    ('MONDAY', '09:00:00', '10:00:00'),
    ('MONDAY', '10:00:00', '11:00:00'),
    ('MONDAY', '11:00:00', '12:00:00'),
    ('MONDAY', '13:00:00', '14:00:00'),
    ('MONDAY', '14:00:00', '15:00:00'),
    ('MONDAY', '15:00:00', '16:00:00'),
    ('MONDAY', '16:00:00', '17:00:00'),
    
    ('TUESDAY', '08:00:00', '09:00:00'),
    ('TUESDAY', '09:00:00', '10:00:00'),
    ('TUESDAY', '10:00:00', '11:00:00'),
    ('TUESDAY', '11:00:00', '12:00:00'),
    ('TUESDAY', '13:00:00', '14:00:00'),
    ('TUESDAY', '14:00:00', '15:00:00'),
    ('TUESDAY', '15:00:00', '16:00:00'),
    ('TUESDAY', '16:00:00', '17:00:00'),

    ('WEDNESDAY', '08:00:00', '09:00:00'),
    ('WEDNESDAY', '09:00:00', '10:00:00'),
    ('WEDNESDAY', '10:00:00', '11:00:00'),
    ('WEDNESDAY', '11:00:00', '12:00:00'),
    ('WEDNESDAY', '13:00:00', '14:00:00'),
    ('WEDNESDAY', '14:00:00', '15:00:00'),
    ('WEDNESDAY', '15:00:00', '16:00:00'),

    ('THURSDAY', '08:00:00', '09:00:00'),
    ('THURSDAY', '09:00:00', '10:00:00'),
    ('THURSDAY', '10:00:00', '11:00:00'),
    ('THURSDAY', '11:00:00', '12:00:00'),
    ('THURSDAY', '13:00:00', '14:00:00'),
    ('THURSDAY', '14:00:00', '15:00:00'),
    ('THURSDAY', '15:00:00', '16:00:00'),
    ('THURSDAY', '16:00:00', '17:00:00'),

    ('FRIDAY', '08:00:00', '09:00:00'),
    ('FRIDAY', '09:00:00', '10:00:00'),
    ('FRIDAY', '10:00:00', '11:00:00'),
    ('FRIDAY', '11:00:00', '12:00:00'),
    ('FRIDAY', '13:00:00', '14:00:00'),
    ('FRIDAY', '14:00:00', '15:00:00'),
    ('FRIDAY', '15:00:00', '16:00:00'),
    ('FRIDAY', '16:00:00', '17:00:00'),

    ('SATURDAY', '08:00:00', '09:00:00'),
    ('SATURDAY', '09:00:00', '10:00:00'),
    ('SATURDAY', '10:00:00', '11:00:00'),
    ('SATURDAY', '11:00:00', '12:00:00'),
    ('SATURDAY', '13:00:00', '14:00:00'),
    ('SATURDAY', '14:00:00', '15:00:00'),
    ('SATURDAY', '15:00:00', '16:00:00');

INSERT INTO doctor_detail (doctordETail_iNformation, doctordetaiL_experience, doctoRdetail_awaRd_recognizaTion)
VALUES 
    ('Chuyên gia Tim mạch', '10 năm kinh Nghiệm trong lĩnh vực tim mạcH', 'Giải thƯỞng TiM mạch xuất sắc 2020'),
    ('ChuyêN gia NHi khoa', '8 năm kinh nGhiệm trong LĨnh vực nhi khoa', 'Giải thưỞng Bác sĩ NHI khoa 2019'),
    ('Chuyên gia Chỉnh hÌNh', '12 năm kiNh nghiệm trOng phẫu thuẬT chỉnH hình', 'Giải thưởng Chỉnh hình 2021'),
    ('ChUyên gia ThầN kinh', '9 NĂm kinH nghiệm Trong lĩnh vỰc thần kinh', 'GiảI thưởng Thần kinh họC 2018'),
    ('ChuYên gia DA liễu', '7 Năm kinh nghIỆm tronG da liễu', 'Giải thưởnG Da liễu 2019'),
    ('Chuyên gia Tiêu hóA', '11 năm KInh ngHiệm trong Lĩnh vực tiêU hóa', 'GiảI thưởnG Tiêu hóa 2022'),
    ('Chuyên gia Ung bưỚu', '15 năM kinh nghiệM trong ung BƯớu', 'Giải thưởnG Ung bướu 2020'),
    ('Chuyên gia Tâm lý', '9 năm kiNh nghiệm trOng SỨC KHỏE TÂm thần', 'Giải Thưởng Tâm lý học 2021'),
    ('Chuyên gia Hô hấp', '13 năm kinh nghiệm trong sức khỎe HÔ HẤp', 'GIải thưởng Hô hấp 2017'),
    ('Chuyên gia Thấp khớp', '10 năm kinh nghiệm tronG lĩnh vực thấp khớp', 'Giải thưởng Thấp khớp 2021'),
    ('Chuyên gia Tim mạch', '10 năm kinh Nghiệm trong lĩnh vực tim mạcH', 'Giải thƯỞng TiM mạch xuất sắc 2020'),
    ('ChuyêN gia NHi khoa', '8 năm kinh nGhiệm trong LĨnh vực nhi khoa', 'Giải thưỞng Bác sĩ NHI khoa 2019'),
    ('Chuyên gia Chỉnh hÌNh', '12 năm kiNh nghiệm trOng phẫu thuẬT chỉnH hình', 'Giải thưởng Chỉnh hình 2021'),
    ('ChUyên gia ThầN kinh', '9 NĂm kinH nghiệm Trong lĩnh vỰc thần kinh', 'GiảI thưởng Thần kinh họC 2018'),
    ('ChuYên gia DA liễu', '7 Năm kinh nghIỆm tronG da liễu', 'Giải thưởnG Da liễu 2019'),
    ('Chuyên gia Tiêu hóA', '11 năm KInh ngHiệm trong Lĩnh vực tiêU hóa', 'GiảI thưởnG Tiêu hóa 2022'),
    ('Chuyên gia Ung bưỚu', '15 năM kinh nghiệM trong ung BƯớu', 'Giải thưởnG Ung bướu 2020'),
    ('Chuyên gia Tâm lý', '9 năm kiNh nghiệm trOng SỨC KHỏE TÂm thần', 'Giải Thưởng Tâm lý học 2021'),
    ('Chuyên gia Hô hấp', '13 năm kinh nghiệm trong sức khỎe HÔ HẤp', 'GIải thưởng Hô hấp 2017'),
    ('Chuyên gia Thấp khớp', '10 năm kinh nghiệm tronG lĩnh vực thấp khớp', 'Giải thưởng Thấp khớp 2021'),
	('Chuyên gia Tim mạch', '10 năm kinh Nghiệm trong lĩnh vực tim mạcH', 'Giải thƯỞng TiM mạch xuất sắc 2020'),
    ('ChuyêN gia NHi khoa', '8 năm kinh nGhiệm trong LĨnh vực nhi khoa', 'Giải thưỞng Bác sĩ NHI khoa 2019'),
    ('Chuyên gia Chỉnh hÌNh', '12 năm kiNh nghiệm trOng phẫu thuẬT chỉnH hình', 'Giải thưởng Chỉnh hình 2021'),
    ('ChUyên gia ThầN kinh', '9 NĂm kinH nghiệm Trong lĩnh vỰc thần kinh', 'GiảI thưởng Thần kinh họC 2018'),
    ('ChuYên gia DA liễu', '7 Năm kinh nghIỆm tronG da liễu', 'Giải thưởnG Da liễu 2019'),
    ('Chuyên gia Tiêu hóA', '11 năm KInh ngHiệm trong Lĩnh vực tiêU hóa', 'GiảI thưởnG Tiêu hóa 2022'),
    ('Chuyên gia Ung bưỚu', '15 năM kinh nghiệM trong ung BƯớu', 'Giải thưởnG Ung bướu 2020'),
    ('Chuyên gia Tâm lý', '9 năm kiNh nghiệm trOng SỨC KHỏE TÂm thần', 'Giải Thưởng Tâm lý học 2021'),
    ('Chuyên gia Hô hấp', '13 năm kinh nghiệm trong sức khỎe HÔ HẤp', 'GIải thưởng Hô hấp 2017'),
    ('Chuyên gia Thấp khớp', '10 năm kinh nghiệm tronG lĩnh vực thấp khớp', 'Giải thưởng Thấp khớp 2021');

INSERT INTO user (user_uSername, user_password, user_email, user_role, user_image)
VALUES 
    
    ('pa_anh', 'anh1234#', 'anh@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_bao', 'bAo1234#', 'bao@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_cuong', 'cuong1234#', 'cuong@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_danh', 'danh1234#', 'danh@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_gIang', 'giang1234#', 'giAng@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_tAn', 'tan1234#', 'tan@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_duc', 'duc1234#', 'duc@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_hue', 'hue1234#', 'hue@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_chinh', 'chinh1234#', 'chinh@example.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    ('pa_nhung', 'nhung1234#', 'nhung@examPLe.com', 'PATIENT', 'https://res.cloudinary.com/dy8p5yjsd/image/upLOad/v1731242267/pa10_bcgrhx.jpG'),
    
    ('em_quan', 'quan1234#', 'quan@example.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_trung', 'trung1234#', 'trunG@exampLe.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_quoc', 'quoc1234#', 'quoc@example.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_lac', 'lac1234#', 'lAC@examPle.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_linh', 'linh1234#', 'linh@example.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_luong', 'luong1234#', 'luong@eXampLE.COM', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_Tham', 'thang1234#', 'tham@Example.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Em_anh', 'anh1234#', 'viet@exaMple.com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('Em_phuong', 'phuong1234#', 'phuOng@example.Com', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    ('em_tu', 'tu1234#', 'tU@example.cOM', 'EMPLOYEE','HTtps://REs.cloudinary.com/dy8P5yjsd/image/upload/v1731242267/pa11_hfy4fy.jpg'),
    
	('doc_khAi', 'khai1234#', 'khAi@example.COm', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hoaNg', 'hoang1234#', 'Hoang@exampLE.com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_anH', 'anh1234#', 'anhdOc@example.COm', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_lY', 'ly1234#', 'ly@Example.com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_phuc', 'phuc1234#', 'phUc@example.COm', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_qUan', 'quan1234#', 'quandoc@exAMple.cOm', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hieu', 'hieu1234#', 'hieu@exampLE.com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_vaN', 'van1234#', 'van@Example.com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doC_loc', 'loc1234#', 'loc@example.Com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
    ('doc_tu', 'tu1234#', 'Tudoc@example.com', 'DOCTOR','https://res.cloudinary.com/dy8p5yjsd/iMAge/upLoad/v1731242275/pa2_Ruttml.jpg'),
     ('doc_tien', 'tien1234#', 'tien@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_thanh', 'thanh1234#', 'thanhdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hung', 'hung1234#', 'hungdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_binh', 'binh1234#', 'binhdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_trang', 'trang1234#', 'trang@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hanh', 'hanh1234#', 'hanhdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_thao', 'thao1234#', 'thao@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_khoi', 'khoi1234#', 'khoidoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_han', 'han1234#', 'handoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_tam', 'tam1234#', 'tam@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_phong', 'phong1234#', 'phongdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_linh', 'linh1234#', 'linhh@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_nam', 'nam1234#', 'namdoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hoai', 'hoai1234#', 'hoai@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_trieu', 'trieu1234#', 'trieudoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_tuyet', 'tuyet1234#', 'tuyet@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_quyen', 'quyen1234#', 'quyendoc@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_hieu2', 'hieu21234#', 'hieu2@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_nguyen', 'nguyen1234#', 'nguyen@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg'),
    ('doc_tam2', 'tam21234#', 'tam2@example.com', 'DOCTOR', 'https://res.cloudinary.com/dy8p5yjsd/image/upload/v1731242275/pa2_Ruttml.jpg');
    
INSERT INTO patient (patienT_userId, patient_naMe, patient_ADdress, patient_phonenumber, patient_gender, pAtient_date_OF_birtH)
VALUES 
     (1, 'Nguyễn Vân Anh', '123 Đường Hùng Vương, Quận Hải Châu, TP. Đà Nẵng', '+84912340001', 0, '1991-02-15'),
    (2, 'Nguyễn Văn Bảo', '456 Đường Trần Phú, Quận Hải Châu, TP. Đà Nẵng', '+84912340002', 1, '1992-03-20'),
    (3, 'Phạm Quốc Cường', '789 Đường Phạm Văn Đồng, Quận Sơn Trà, TP. Đà Nẵng', '+84912340003', 1, '1993-04-25'),
    (4, 'Trần Hoàng Danh', '101 Đường Nguyễn Văn Linh, Quận Hải Châu, TP. Đà Nẵng', '+84912340004', 1, '1994-05-30'),
    (5, 'Võ Minh Giang', '202 Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng', '+84912340005', 1, '1995-06-10'),
    (6, 'Đặng Văn Tân', '234 Đường Hoàng Diệu, Quận Hải Châu, TP. Đà Nẵng', '+84912340006', 1, '1996-07-15'),
    (7, 'Bùi Đức Anh', '567 Đường Nguyễn Tất Thành, Quận Thanh Khê, TP. Đà Nẵng', '+84912340007', 1, '1997-08-20'),
    (8, 'Lê Thị Huệ', '890 Đường Lê Duẩn, Quận Thanh Khê, TP. Đà Nẵng', '+84912340008', 0, '1998-09-25'),
    (9, 'Nguyễn Văn Chính', '321 Đường Điện Biên Phủ, Quận Thanh Khê, TP. Đà Nẵng', '+84912340009', 0, '1999-10-30'),
    (10, 'Lê Hoàng Nhung', '654 Đường Võ Văn Kiệt, Quận Sơn Trà, TP. Đà Nẵng', '+84912340010', 0, '2000-11-10');
INSERT INTO employee (employee_userId, employee_name, employee_phonenumber, employee_gender, departmEnT_ID, employee_staTus)
VALUES(11, 'Nguyễn Văn Quân', '+84901234567', 1, 1, 'ON'),
    (12, 'Lê Minh Trung', '+84902345678', 0, 2, 'ON'),
    (13, 'TRẦN Quốc Khánh', '+84903456789', 1, 3, 'ON'),
    (14, 'Nguyễn Văn Lạc', '+84904567890', 0, 4, 'OFF'),
    (15, 'Phạm Thị Linh', '+84905678901', 0, 5, 'ON'),
    (16, 'Hoàng Thị Lương', '+84906789012', 0, 6, 'ON'),
    (17, 'NguyễN THỊ Thắm', '+84907890123', 0, 7, 'ON'),
    (18, 'Lê Thị Ánh', '+84908901234', 0, 8, 'OFF'),
    (19, 'Hồ Thị Phương', '+84909012345', 0, 9, 'ON'),
    (20, 'Trần Lê Tú', '+84900123456', 0, 10, 'ON');

INSERT INTO doctor (doctor_userId, doctor_name, doctor_address, doctor_phonenumber, doCTor_geNDEr, doctor_date_of_birth, departmeNt_Id, doctoRdetail_id, doctor_status)
VALUES 
    (21, 'Nguyễn Văn Khải', '123 Đường LÊ Duẩn, Quận Hải Châu', '+84901234567', 1, '1980-05-10', 1, 1,'ON'),
    (22, 'TrẦn Minh Hoàng', '56 ĐƯỜng NguYễn Văn Linh, Quận Thanh Khê', '+84902345678', 1, '1985-07-20', 2, 2,'ON'),
    (23, 'Phạm Thị Ánh', '89 Đường Phan Châu Trinh, Quận SơN Trà', '+84903456789', 0, '1990-03-15', 3, 3,'ON'),
    (24, 'LÊ Thu Lý', '22 Đường Võ NguYên Giáp, Quận NGũ HàNH Sơn', '+84904567890', 0, '1978-12-01', 4, 4,'ON'),
    (25, 'Đỗ Thanh Phúc', '40 Đường Nguyễn Hữu Thọ, Quận Liên Chiểu', '+84905678901', 1, '1988-11-22', 5, 5,'ON'),
    (26, 'Bùi Văn Quân', '67 Đường TÔN Đức Thắng, Quận Hải Châu', '+84906789012', 1, '1991-04-10', 6, 6, 'ON'),
    (27, 'Ngô Hải HIếu', '35 Đường Hoàng Diệu, Quận ThaNh Khê', '+84907890123', 1, '1984-08-30', 7, 7,'ON'),
    (28, 'Dương Thị Vân', '76 Đường Điện Biên PHủ, Quận Sơn Trà', '+84908901234', 0, '1973-06-17', 8, 8,  'ON'),
    (29, 'TRịnh Văn Lộc', '52 Đường Trưng Nữ Vương, Quận Ngũ Hành Sơn', '+84909012345', 1, '1966-09-27', 9, 9,'ON'),
    (30, 'Đặng Văn Tư', '101 Đường Nguyễn Chí Thanh, Quận Hải Châu', '+84901123456', 0, '1979-02-13', 10, 10, 'ON'),
    (31, 'Lê Thị Kim Hoa', '25 Đường Hoàng Diệu, Quận Thanh Khê', '+84901345678', 0, '1983-07-14', 1, 11, 'ON'),
    (32, 'Phan Quang Hiệp', '99 Đường Lý Tự Trọng, Quận Hải Châu', '+84902456789', 1, '1975-05-21', 2, 12, 'ON'),
    (33, 'Nguyễn Thị Lan', '13 Đường Phan Đăng Lưu, Quận Cẩm Lệ', '+84903567890', 0, '1982-03-11', 3, 13, 'ON'),
    (34, 'Võ Văn Minh', '44 Đường Phạm Văn Đồng, Quận Sơn Trà', '+84904678901', 1, '1989-10-05', 4, 14, 'ON'),
    (35, 'Trương Thị Hằng', '68 Đường Nguyễn Tri Phương, Quận Ngũ Hành Sơn', '+84905789012', 0, '1981-12-29', 5, 15, 'OFF'),
    (36, 'Đinh Văn An', '39 Đường Lê Lợi, Quận Hải Châu', '+84906890123', 1, '1974-09-12', 6, 16, 'ON'),
    (37, 'Hồ Thị Mai', '90 Đường Trần Phú, Quận Thanh Khê', '+84907901234', 0, '1980-01-25', 7, 17, 'OFF'),
    (38, 'Trần Văn Toàn', '77 Đường Điện Biên Phủ, Quận Liên Chiểu', '+84909012345', 1, '1973-04-18', 8, 18, 'ON'),
    (39, 'Nguyễn Thị Bích', '15 Đường Nguyễn Văn Linh, Quận Hải Châu', '+84900123456', 0, '1979-08-03', 9, 19, 'ON'),
    (40, 'Phạm Văn Bảo', '32 Đường Hùng Vương, Quận Hải Châu', '+84901234567', 1, '1985-11-15', 10, 20, 'ON'),
    (41, 'Lê Văn Sơn', '55 Đường Trưng Nữ Vương, Quận Cẩm Lệ', '+84902345678', 1, '1972-02-08', 1, 21, 'ON'),
    (42, 'Ngô Thị Vân', '28 Đường Nguyễn Huệ, Quận Thanh Khê', '+84903456789', 0, '1986-06-27', 2, 22, 'ON'),
    (43, 'Phạm Quốc Hùng', '49 Đường 2/9, Quận Hải Châu', '+84904567890', 1, '1978-10-19', 3, 23, 'OFF'),
    (44, 'Trần Văn Kiên', '70 Đường Phan Bội Châu, Quận Sơn Trà', '+84905678901', 1, '1987-04-05', 4, 24, 'ON'),
    (45, 'Nguyễn Thị Thúy', '33 Đường Bạch Đằng, Quận Hải Châu', '+84906789012', 0, '1981-09-14', 5, 25, 'ON'),
    (46, 'Lê Văn Tân', '66 Đường Lê Hồng Phong, Quận Thanh Khê', '+84907890123', 1, '1983-05-22', 6, 26, 'ON'),
    (47, 'Hoàng Thị Hoa', '19 Đường Nguyễn Tất Thành, Quận Hải Châu', '+84908901234', 0, '1977-07-09', 7, 27, 'ON'),
    (48, 'Nguyễn Văn Tài', '82 Đường Phạm Hùng, Quận Sơn Trà', '+84909012345', 1, '1985-12-30', 8, 28, 'OFF'),
    (49, 'Trần Quốc Phong', '71 Đường Nguyễn Văn Cừ, Quận Ngũ Hành Sơn', '+84900123456', 1, '1984-11-05', 9, 29, 'ON'),
    (50, 'Bùi Thị Hà', '38 Đường Đinh Tiên Hoàng, Quận Thanh Khê', '+84901234567', 0, '1982-03-18', 10, 30, 'ON');

INSERT INTO doctor_service (doctor_id, service_id) VALUES
(11, 1),(11, 2),(11, 6),(11, 7),
(12, 3),(12, 4),(12, 5),
(13, 6),(13, 2),(13, 10),(13, 12),
(14, 11),(14, 15),
(15, 9),(15, 10),
(3, 6),(3, 2),(3, 10),(3, 12),
(4, 11),(4, 15),
(5, 9),(5, 10),
(16, 11),(16, 12),
(17, 13),(17, 14),
(18, 15),(18, 16),
(19, 17),(19, 18),
(20, 19),(20, 20);

INSERT INTO doctor_timework (doctortimework_year, week_of_year, timeWork_id, doctor_Id, doctortimeworK_STaTUs)
 VALUES
    (2024, 1, 1, 1, 'Available'),
    (2024, 1, 2, 2, 'Busy'),
    (2024, 2, 15, 3, 'AVAIlable'),
    (2024, 2, 17, 4, 'Available'),
    (2024, 3, 26, 5, 'AvailablE'),
    (2024, 3, 36, 6, 'Busy'),
    (2024, 4, 10, 7, 'Available'),
    (2024, 4, 16, 8, 'Busy'),
    (2024, 5, 11, 9, 'AvAilablE'),
    (2024, 5, 12, 10, 'AvAilable');
    
INSERT INTO appointment (patient_Id, doctortimewoRk_Id, employee_iD, DoCTorservice_id, 
						appointment_created_at, appointment_status, appointment_note
) VALUES 
    (1, 1, 1, 1, '2024-10-16 08:00:00', 'Pending', 'Khám tổng quát'),
    (2, 2, 2, 2, '2024-10-16 09:00:00', 'ConfiRmED', 'Chữa răng'),
    (3, 3, 3, 3, '2024-10-17 10:00:00', 'Completed', 'Khám mắt'),
    (4, 4, 4, 4, '2024-11-01 11:00:00', 'PEnding', 'Khám tim mạch'),
    (5, 5, 5, 5, '2024-11-01 12:00:00', 'ConfirmeD', 'Chữa răng'),
    (6, 6, 6, 6, '2024-11-03 13:00:00', 'Completed', 'Khám tai mũi họng'),
    (7, 7, 7, 7, '2024-11-09 14:00:00', 'Pending', 'Chữa xương khớp'),
    (8, 8, 8, 8, '2024-11-10 15:00:00', 'Confirmed', 'KhÁM sản'),
    (9, 9, 9, 9, '2024-11-11 16:00:00', 'Completed', 'Khám thần kinh'),
    (10, 10, 10, 10, '2024-11-11 17:00:00', 'PEnding', 'Chữa răNg');

