import { Fragment } from "react";
import Head from "next/head";

import { EventContent, EventLogistics, EventSummary } from "../../components/event-detail";
import Comments from "../../components/input/comments";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailPage = (props) => {
    // Queries "eventId" string as params
    const event = props.selectedEvent;

    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta
                    name={event.title}
                    content={event.description}
                />
            </Head>
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
            <Comments eventId={event.id} />
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const event = await getEventById(context.params.eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30,
    }
}

export async function getStaticPaths(context) {
    const paths = (await getFeaturedEvents()).map(event => ({ params: { eventId: event.id }}))
    return { paths, fallback: 'blocking' }
}

export default EventDetailPage;