export async function getAllEvents() {
    const response = await fetch('https://nextjs-course-50b3c-default-rtdb.firebaseio.com/events.json');
    const data = await response.json();
    const events = [];

    for (const key in data) {
        events.push({ id: key, ...data[key] })
    }

    return events;
};

export const getFeaturedEvents = async () => (
    (await getAllEvents()).filter((event) => event.isFeatured)
);

export const getEventById = async (id) => (
    (await getAllEvents()).find((event) => event.id === id)
);

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}