import { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import { EventList, EventsSearch } from "../../components/events";

export default function EventsPage() {
    const router = useRouter();
    const events = getAllEvents();

    function findEventsHandler(year, month) {
        router.push(`/events/${year}/${month}/`);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
}