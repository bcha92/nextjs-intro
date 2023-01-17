import { Fragment } from "react";
import { useRouter } from "next/router";

import { EventList, ResultsTitle } from "../../components/events";
import { Button, ErrorAlert } from "../../components/ui";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEvents = () => {
    // Queries "...slug" array as params
    const filterData = useRouter().query.slug;

    if (!filterData) {
        return <p className="center">Loading...</p>
    }

    const numYear = +filterData[0];
    const numMonth = +filterData[1];

    if (isNaN(numYear) || isNaN(numMonth) || numYear < 2020 ||
        numYear > 2030 || numMonth < 1 || numMonth > 12) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>

                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <ResultsTitle date={new Date(numYear, numMonth - 1)} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export default FilteredEvents;