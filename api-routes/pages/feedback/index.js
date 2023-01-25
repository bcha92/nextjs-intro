import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

export default function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`) // /api/some-feedback-id
            .then(res => res.json())
            .then(data => { setFeedbackData(data.feedback) })
    }

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map(item => (
                    <li key={item.id}>
                        {item.text} <button onClick={
                            loadFeedbackHandler.bind(null, item.id)
                        }>
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export async function getStaticProps() {
    const data = extractFeedback(buildFeedbackPath());
    return {
        props: {
            feedbackItems: data,
        }
    }
}