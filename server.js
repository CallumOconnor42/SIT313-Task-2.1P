const express = require('express');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

app.use(express.json());
app.use(express.static('public'));

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to handle form submission and send welcome email
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    const data = {
        from: 'oconnorca@deakin.edu.au',
        to: email,
        subject: 'Welcome to DEV@Deakin',
        text: 'Thank you for subscribing to DEV@Deakin!',
        html: '<strong>Thank you for subscribing to DEV@Deakin!</strong>',
    };

    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then((body) => {
            console.log(body);
            res.status(200).send('Welcome email sent successfully');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error sending email');
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});