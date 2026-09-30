const API_BASE = '/api';

export const fetchEvents = () => fetch(`${API_BASE}/events`).then(r => r.json());
export const fetchEventById = (id) => fetch(`${API_BASE}/events/${id}`).then(r => r.json());
export const searchEvents = (name) => fetch(`${API_BASE}/events/search?name=${encodeURIComponent(name)}`).then(r => r.json());
export const filterEvents = (category) => fetch(`${API_BASE}/events/filter?category=${encodeURIComponent(category)}`).then(r => r.json());
export const createEvent = (data) => fetch(`${API_BASE}/events`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r => r.json());
export const updateEvent = (id, data) => fetch(`${API_BASE}/events/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r => r.json());
export const deleteEvent = (id) => fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });

export const fetchRegistrations = () => fetch(`${API_BASE}/registrations`).then(r => r.json());
export const fetchRegistrationsByEvent = (eventId) => fetch(`${API_BASE}/registrations/event/${eventId}`).then(r => r.json());
export const searchRegistrations = (name) => fetch(`${API_BASE}/registrations/search?name=${encodeURIComponent(name)}`).then(r => r.json());
export const filterRegistrations = (college) => fetch(`${API_BASE}/registrations/filter?college=${encodeURIComponent(college)}`).then(r => r.json());
export const createRegistration = (eventId, data) => fetch(`${API_BASE}/registrations/event/${eventId}`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }).then(r => {
    if (!r.ok) return r.text().then(text => { throw new Error(text) });
    return r.json();
});
