package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.EmployeeRequest;
import PBL6.example.UNIME.dto.response.EmployeeResponse;
import PBL6.example.UNIME.entity.Department;
import PBL6.example.UNIME.entity.Employee;
import PBL6.example.UNIME.entity.User;
import PBL6.example.UNIME.enums.Role;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.EmployeeRepository;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class EmployeeService {
    private static final Logger log = LoggerFactory.getLogger(EmployeeService.class);
    EmployeeRepository employeeRepository;
    UserService userService;
    DepartmentService departmentService;

    @PreAuthorize("hasRole('ADMIN')")
    public EmployeeResponse createEmployee(@Valid EmployeeRequest request) {
        // Tìm department dựa trên departmentId từ request
        Department department = departmentService.getDepartmentByName(request.getDepartmentName());
        //1. kiểm tra, khởi tạo user
        User user = new User();
        user.setUsername(request.getEmployeeUsername());
        user.setPassword(request.getEmployeePassword());
        user.setImage(request.getEmployeeImage());
        user.setEmail(request.getEmployeeEmail());
        user.setRole(Role.EMPLOYEE.name());

        // 2. Tạo Employee
        Employee employee = new Employee();
        employee.setEmployeeUserId(userService.createUser(user));
        employee.setEmployeeName(request.getEmployeeName());
        employee.setEmployeePhonenumber(request.getEmployeePhoneNumber());
        employee.setEmployeeGender(request.getEmployeeGender());
        employee.setEmployeeStatus("ON");
        employee.setDepartment(department);

        return mapToResponse(employeeRepository.save(employee));
    }

    @PostAuthorize("hasRole('ADMIN')")
    public List<EmployeeResponse> getAllEmployee(){
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @PostAuthorize("hasRole('ADMIN')")
    public EmployeeResponse getEmployeeById(Integer employeeId) {
        return mapToResponse(employeeRepository.findById(employeeId)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND)));
    }


    @PreAuthorize("hasRole('ADMIN')")
    public EmployeeResponse updateByAdmin(Integer employee_id, EmployeeRequest request){

        //1. kiểm tra tồn tại Employee theo Username
        Employee employee = employeeRepository.findById(employee_id)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));

        //2. Kiểm tra sự tồn tại của departmentId trong bảng Department
        Department department = departmentService.getDepartmentByName(request.getDepartmentName());

        //3. Cập nhật Status, Department
        employee.setDepartment(department);
        employee.setEmployeeStatus(request.getEmployeeStatus());
        return mapToResponse(employeeRepository.save(employee));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteEmployee(Integer employee_id) {
        Employee employee = employeeRepository.findById(employee_id)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
        employeeRepository.delete(employee);
        userService.deleteUser(employee.getEmployeeUserId().getUserId());
    }

//  ==== Token
    public EmployeeResponse getMyInfo(String employee_username) {
        User user = userService.getUserByUsername(employee_username);
        Employee employee = employeeRepository.findByemployeeUserId(user)
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXITED));

        return mapToResponse(employee);
    }

    public EmployeeResponse updateMyInfo(String employee_username, EmployeeRequest request){
        //1. kiểm tra tồn tại Employee theo Username
        Employee employee = employeeRepository.findByemployeeUserId(userService.getUserByUsername(employee_username))
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));

        // 2. cập nhật vào bảng User
        User user = new User();
        user.setPassword(request.getEmployeePassword());
        user.setImage(request.getEmployeeImage());
        user.setEmail(request.getEmployeeEmail());
        userService.updateUser(employee.getEmployeeUserId().getUserId(), user);

        employee.setEmployeeName(request.getEmployeeName());
        employee.setEmployeePhonenumber(request.getEmployeePhoneNumber());
        employee.setEmployeeGender(request.getEmployeeGender());
        return mapToResponse(employeeRepository.save(employee));
    }
// =========
    public Integer getDepartmentIdByUser(User user) {
        Employee employee = employeeRepository.findByemployeeUserId(user)
                .orElseThrow( ()-> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));

        return employee.getDepartment().getDepartmentId();
    }
    private EmployeeResponse mapToResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getEmployeeId(),

                employee.getEmployeeUserId().getUsername(),
                employee.getEmployeeUserId().getPassword(),
                employee.getEmployeeUserId().getEmail(),
                employee.getEmployeeUserId().getImage(),

                employee.getEmployeeName(),
                employee.getEmployeePhonenumber(),
                employee.isEmployeeGender(),
                employee.getEmployeeStatus(),

                employee.getDepartment().getDepartmentName()
        );
    }
}
