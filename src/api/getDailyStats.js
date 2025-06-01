const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function getDailyStats(req, res) {
    try {
        console.log('Fetching stats...');
        
        // Get the single stats record
        const { data, error } = await supabase
            .from('daily_stats')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching stats:', error);
            return res.status(500).json({ error: 'Failed to fetch statistics' });
        }

        console.log('Successfully fetched stats:', data);
        
        // Format the response
        const stats = {
            page_views: data.page_views,
            cta_clicks: data.cta_clicks,
            page_exits: data.page_exits,
            total_events: data.total_events
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Error in getDailyStats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = getDailyStats; 