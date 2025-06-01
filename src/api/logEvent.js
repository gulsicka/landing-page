const { createClient } = require('@supabase/supabase-js');
const updateDailyStats = require('./updateDailyStats');
require('dotenv').config();

console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key exists:', !!process.env.SUPABASE_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function logEvent(req, res) {
    try {
        console.log('Received event log request:', req.body);
        const { type, session_id, timestamp, duration, ...additionalData } = req.body;
        console.log("Event type:", type);
        console.log("Additional data:", additionalData);

        const { data, error } = await supabase
            .from('user_events')
            .insert([
                {
                    type,
                    session_id,
                    timestamp,
                    duration,
                    additional_data: additionalData
                }
            ]);

        if (error) {
            console.error('Error inserting event:', error);
            return res.status(500).json({ error: 'Failed to log event' });
        }

        console.log('Event inserted successfully, updating daily stats...');
        // Update daily stats
        await updateDailyStats(type);
        console.log('Daily stats update completed');

        res.status(200).json({ message: 'Event logged successfully' });
    } catch (error) {
        console.error('Error in logEvent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = logEvent; 