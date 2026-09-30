package com.collegeclub.event.controller;

import com.collegeclub.event.entity.Registration;
import com.collegeclub.event.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping("/event/{eventId}")
    public ResponseEntity<?> registerForEvent(@PathVariable Long eventId, @Valid @RequestBody Registration registration) {
        try {
            return ResponseEntity.ok(registrationService.createRegistration(eventId, registration));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getRegistrationsForEvent(@PathVariable Long eventId) {
        return registrationService.getRegistrationsByEvent(eventId);
    }

    @GetMapping("/search")
    public List<Registration> searchRegistrations(@RequestParam String name) {
        return registrationService.searchRegistrationsByName(name);
    }

    @GetMapping("/filter")
    public List<Registration> filterRegistrations(@RequestParam String college) {
        return registrationService.filterRegistrationsByCollege(college);
    }
}
