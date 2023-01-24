import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import { EventList, EventsSearch } from "../../components/events";

export default function EventsPage(props) {
    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        router.push(`/events/${year}/${month}/`);
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta
                name="description"
                content="Find a lot of great events that allow you to evolve."
                />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: { events }
    }
}