import fs from 'fs';
import path from 'path';

// Ensure you create /data/feedback.json with [] empty array prior running script
export const buildFeedbackPath = () => (
    path.join(process.cwd(), 'data', 'feedback.json')
);

export const extractFeedback = (path) => (
    JSON.parse(fs.readFileSync(path))
);

export default function handler(req, res) {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    if (req.method === "POST") {
        const { email, text } = req.body;

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            text,
        };

        // store that in a database file
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Success!', feedback: newFeedback })
    } else {
        res.status(200).json({ feedback: data })
    }
};