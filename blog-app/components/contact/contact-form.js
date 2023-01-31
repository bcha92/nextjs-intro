import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../../ui/notification";

const sendContactData = async contactDetails => {
    const response = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(contactDetails),
            headers: { 'Content-Type': 'application/json' }
        });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}

const formInit = {
    name: '',
    email: '',
    message: '',
}

const ContactForm = () => {
    const [enteredForm, setEnteredForm] = useState(formInit);
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'pending' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [requestStatus])

    const sendMessageHandler = async event => {
        event.preventDefault();
        setRequestStatus('pending');
        // optional: add client-side validation

        try {
            await sendContactData(enteredForm);
            setRequestStatus('success');
        } catch (error) {
            setRequestError(error.message)
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'sending message...',
            message: 'Your message is on its way!',
        }
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        }
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: requestError,
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={enteredForm.email}
                            onChange={event => setEnteredForm({
                                ...enteredForm,
                                email: event.target.value
                            })}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={enteredForm.name}
                            onChange={event => setEnteredForm({
                                ...enteredForm,
                                name: event.target.value
                            })}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows="5"
                        value={enteredForm.message}
                        required
                        onChange={event => setEnteredForm({
                            ...enteredForm,
                            message: event.target.value
                        })}
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
        </section>
    )
}

export default ContactForm;