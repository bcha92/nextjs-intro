import classes from "./event-item.module.css";
import { Button } from "../ui";
import { DateIcon, AddressIcon, ArrowRightIcon } from "../icons";

export default function EventItem({ title, image, date, location, id }) {
    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={image || "undefined image"} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{ title }</h2>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{ readableDate }</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{location.split(',').join('\n')}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${id}`}>
                        <span>Explore Event</span>
                        <span className={classes.icon}>
                            <ArrowRightIcon />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    )
}