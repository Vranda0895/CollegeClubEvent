package com.collegeclub.event.service;

import com.collegeclub.event.entity.Event;
import com.collegeclub.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        return eventRepository.findById(id).map(event -> {
            event.setEventName(updatedEvent.getEventName());
            event.setDate(updatedEvent.getDate());
            event.setTime(updatedEvent.getTime());
            event.setVenue(updatedEvent.getVenue());
            event.setDescription(updatedEvent.getDescription());
            event.setCategory(updatedEvent.getCategory());
            return eventRepository.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found with id " + id));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public List<Event> searchEventsByName(String name) {
        return eventRepository.findByEventNameContainingIgnoreCase(name);
    }

    public List<Event> filterEventsByCategory(String category) {
        return eventRepository.findByCategoryIgnoreCase(category);
    }
}
