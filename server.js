const express = require('express');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '.')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Backend verification endpoint
app.post('/api/verify', async (req, res) => {
    try {
        const generateGuid = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        const payload = {
            reference: generateGuid(),
            callback_uri: "https://webhook.site/a43a7a3f-d9f2-4c7b-8f31-e6603c40c03a",
            name: "Willeke De Bruijn",
            email: "ecingel@icloud.com",
            environment: "mobile-verify",
            scope: "selfie,documents(driving)"
            //use_defaults: true
        };

        console.log('Making API call to Mitek with payload:', payload);

        const response = await fetch('https://eu-west.id.miteksystems.com/api/4.4/request/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from('d0fd8f53-db5d-4473-a69b-c011f63bd113:7cebe5533e5191f2f84a89b840cad981').toString('base64')
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Mitek API Response:', data);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (!data.link) {
            throw new Error('No verification link received from Mitek API');
        }

        res.json({ 
            success: true, 
            data: {
                ...data,
                verificationUrl: data.link
            }
        });
    } catch (error) {
        console.error('Error in verification endpoint:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 