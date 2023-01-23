import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { EventList, ResultsTitle } from "../../components/events";
import { Button, ErrorAlert } from "../../components/ui";

const FilteredEvents = () => {
    const [loadedEvents, setLoadedEvents] = useState();
    // Queries "...slug" array as params in getServerSideProps()
    const filterData = useRouter().query.slug;
    const { data, error } = useSWR(
        'https://nextjs-course-50b3c-default-rtdb.firebaseio.com/events.json',
        url => fetch(url).then(res => res.json())
    );

    useEffect(() => {
        if (data) {
            const events = [];

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }

            setLoadedEvents(events);
        }
    }, [data])

    if (!loadedEvents) {
        return <p className="center">Loading...</p>
    }
    
    const numYear = +filterData[0];
    const numMonth = +filterData[1];

    if (isNaN(numYear) || isNaN(numMonth) || numYear < 2020 ||
        numYear > 2030 || numMonth < 1 || numMonth > 12 || error) {
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

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
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

// export async function getServerSideProps(context) {
//     const numYear = +context.params.slug[0];
//     const numMonth = +context.params.slug[1];

//     if (isNaN(numYear) || isNaN(numMonth) || numYear < 2020 ||
//         numYear > 2030 || numMonth < 1 || numMonth > 12) {
//         return { props: { hasError: true }}
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth,
//             }
//         }
//     }
// }

export default FilteredEvents;