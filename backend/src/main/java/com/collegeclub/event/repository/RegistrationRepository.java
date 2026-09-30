package com.collegeclub.event.repository;

import com.collegeclub.event.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByEventId(Long eventId);
    List<Registration> findByNameContainingIgnoreCase(String name);
    List<Registration> findByCollegeIgnoreCase(String college);
}
