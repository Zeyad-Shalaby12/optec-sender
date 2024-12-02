const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Bearer Token for extra security
const BEARER_TOKEN = "3ur73kvZfB81qw5cOv6gJh+La+j+I9d0LWx0EKlcrHo="; // استبدل بقيمتك الخاصة

// POST endpoint to send a message
app.post('/send-message', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const { mobile, text } = req.body;

    // Check Bearer Token
    if (!authHeader || authHeader !== `Bearer ${BEARER_TOKEN}`) {
        return res.status(403).json({ error: 'Unauthorized: Invalid Bearer Token' });
    }

    // Validate input
    if (!mobile || !text) {
        return res.status(400).json({ error: 'Mobile and text are required.' });
    }

    // API details
    const url = 'https://toggaar.whats360.live/api/user/v2/send_message_url';
    const clientId = 'eyJ1aWQiOiJtRTU2d2hJVDM2VjhUcnZRVzNuSE95NjdpdWZ5Ukd5bSIsImNsaWVudF9pZCI6Im9wdGVjIn0=';
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtRTU2d2hJVDM2VjhUcnZRVzNuSE95NjdpdWZ5Ukd5bSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyODAxNDQyfQ.KE_GsLap0Xk4OGEV8YFUEUSaEGm7IBASwsfkrCW83j8';

    // Prepare query parameters
    const queryParams = new URLSearchParams({
        client_id: clientId,
        mobile,
        text,
        token,
    });

    const apiUrl = `${url}?${queryParams}`;

    try {
        // Send request to external API
        const response = await fetch(apiUrl, { method: 'GET' });
        const data = await response.json();

        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(3000, () => console.log("Server ready on port 3000."));


module.exports = app;


