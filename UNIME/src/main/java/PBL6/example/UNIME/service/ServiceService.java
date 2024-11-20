package PBL6.example.UNIME.service;

import PBL6.example.UNIME.dto.request.ServiceRequest;
import PBL6.example.UNIME.dto.response.ServiceResponse;
import PBL6.example.UNIME.entity.Department;
import PBL6.example.UNIME.entity.Service;
import PBL6.example.UNIME.exception.AppException;
import PBL6.example.UNIME.exception.ErrorCode;
import PBL6.example.UNIME.repository.ServiceRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@org.springframework.stereotype.Service
@RequiredArgsConstructor
@FieldDefaults(level =  AccessLevel.PRIVATE, makeFinal = true)
public class ServiceService {

    ServiceRepository serviceRepository;
    DepartmentService departmentService;

    @PreAuthorize("hasRole('ADMIN')")
    public ServiceResponse createService(ServiceRequest request) {
        if(serviceRepository.existsByserviceName(request.getServiceName())) {
            throw new AppException(ErrorCode.SERVICE_EXITED);
        }
        // Kiểm tra sự tồn tại của Department
        Department department = departmentService.getDepartmentByName(request.getDepartmentName());

        Service service = new Service();
        service.setServiceName(request.getServiceName());
        service.setServiceImage(request.getServiceImage());
        service.setServiceDescription(request.getServiceDescription());
        service.setServicePrice(request.getServicePrice());
        service.setDepartment(department);

        return mapToResponse(serviceRepository.save(service));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ServiceResponse getServiceById(Integer serviceId){
        return mapToResponse(serviceRepository.findById(serviceId)
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ServiceResponse updateService(Integer serviceId, ServiceRequest request) {
        // Tìm dịch vụ cần cập nhật theo ID
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));

        if(serviceRepository.existsByserviceName(request.getServiceName())) {
            if(!service.getServiceName().equals(request.getServiceName())) {
                throw new AppException(ErrorCode.SERVICE_EXITED);
            }
        }
        service.setServiceName(request.getServiceName());
        service.setServiceImage(request.getServiceImage());
        service.setServiceDescription(request.getServiceDescription());
        service.setServicePrice(request.getServicePrice());

        return mapToResponse(serviceRepository.save(service));
    }
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteService(Integer serviceId) {
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
        serviceRepository.deleteById(serviceId);
    }

// public
    public List<ServiceResponse> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return services.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ServiceResponse> findServiceByName(String serviceName) {
        List<Service> services = serviceRepository.findByServiceNameContaining(serviceName);
        return services.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    private ServiceResponse mapToResponse(Service service) {
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
