package com.collegeclub.event.service;

import com.collegeclub.event.entity.Event;
import com.collegeclub.event.entity.Registration;
import com.collegeclub.event.repository.EventRepository;
import com.collegeclub.event.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    public Registration createRegistration(Long eventId, Registration registration) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id " + eventId));
        registration.setEvent(event);
        return registrationRepository.save(registration);
    }

    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    public List<Registration> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }

    public List<Registration> searchRegistrationsByName(String name) {
        return registrationRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Registration> filterRegistrationsByCollege(String college) {
        return registrationRepository.findByCollegeIgnoreCase(college);
    }
}
