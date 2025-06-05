const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { isBot } = require('./src/utils/botDetection');
const logEvent = require('./src/api/logEvent');
const getDailyStats = require('./src/api/getDailyStats');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());

// API Routes
app.post('/api/logEvent', logEvent);
app.get('/api/getDailyStats', getDailyStats);

// Main route handler with bot detection
app.get('/', (req, res) => {
    // const isBot1 = isBot(req);
    
    // if (isBot1) {
    //     res.sendFile(path.join(__dirname, 'public', 'dog-care.html'));
    // } else {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // }
    // console.log('=== End Main Route ===');
});

app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 
