export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email adderss.' });
            return;
        }

        console.log(email);
        res.status(201).json({ message: 'Signed up!' });
    }
}