import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList({ items }) {
    return (
        <ul className={classes.list}>
            {items.map((event, i) => <EventItem
                key={event.id || i}
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image}
            />)}
        </ul>
    )
}