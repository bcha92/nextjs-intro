import { buildFeedbackPath, extractFeedback } from "./feedback";

export default function handler(req, res) {
    const { feedbackId } = req.query;
    const selectedFeedback = extractFeedback(buildFeedbackPath()).find(
        feedback => feedback.id === feedbackId
    );

    res.status(200).json({ feedback: selectedFeedback })
};