export default function handler(req, res) {
    const { eventId } = req.query;

    // add server-side validation
    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (
            !email.includes('@') ||
            !name || name.trim() === '' ||
            !text || text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            return;
        }

        console.log(email, name, text);
        res.status(201).json({
            message: 'Added comment.',
            comment: {
                id: new Date().toISOString(),
                email,
                name,
                text,
            }
        })
    }

    // retrieve server-side validation
    else if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Brandy', text: 'A first comment!' },
            { id: 'c2', name: 'Monique', text: 'A second comment!' },,
        ]

        res.status(200).json({ comments: dummyList });
    }
}