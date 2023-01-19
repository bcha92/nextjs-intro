import { Fragment } from "react";
import { useRouter } from "next/router";

import { EventContent, EventLogistics, EventSummary } from "../../components/event-detail";
import { ErrorAlert } from "../../components/ui";
import { getEventById } from "../../dummy-data";

const EventDetailPage = () => {
    // Queries "eventId" string as params
    const event = getEventById(useRouter().query.eventId);

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        )
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage;