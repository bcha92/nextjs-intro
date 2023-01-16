import Link from "next/link";
import classes from "./event-item.module.css";

export default function EventItem({ title, image, date, location, id }) {
    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const formattedAddress = location.split(',').join('\n');
    const exploreLink = `/events/${id}`

    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={image || "undefined image"} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{ title }</h2>
                    <div className={classes.date}>
                        <time>{ readableDate }</time>
                    </div>
                    <div className={classes.address}>
                        <address>{ formattedAddress }</address>
                    </div>
                </div>
            </div>
            <div className={classes.actions}>
                <Link href={exploreLink}>Explore Event</Link>
            </div>
        </li>
    )
}