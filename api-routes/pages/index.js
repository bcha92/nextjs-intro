import { useRef, useState } from "react";

export default function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = event => {
    event.preventDefault();

    // { email: 'test@test.com', text: 'Some feedback text' }
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInputRef.current.value,
        text: feedbackInputRef.current.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
      .then(data => console.log(data));
  };

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => { setFeedbackItems(data.feedback) });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea rows="5" id="feedback" ref={feedbackInputRef} />
        </div>

        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item, key) => (
          <li key={item.email + key}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};