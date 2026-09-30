package com.collegeclub.event.repository;

import com.collegeclub.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByEventNameContainingIgnoreCase(String eventName);
    List<Event> findByCategoryIgnoreCase(String category);
}
