const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function updateDailyStats(eventType) {
    try {
        console.log(`Updating stats for event type: ${eventType}`);
        
        // First, try to get the single stats record
        const { data: existingStats, error: fetchError } = await supabase
            .from('daily_stats')
            .select('*')
            .limit(1)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error('Error fetching stats:', fetchError);
            return;
        }

        if (!existingStats) {
            // If no stats exist, create the initial record
            const newStats = {
                date: new Date().toISOString().split('T')[0], // Add today's date
                page_views: eventType === 'page_view' ? 1 : 0,
                cta_clicks: eventType === 'cta_click' ? 1 : 0,
                page_exits: eventType === 'page_exit' ? 1 : 0,
                total_events: 1
            };
            console.log('Creating initial stats record:', newStats);

            const { error: insertError } = await supabase
                .from('daily_stats')
                .insert([newStats]);

            if (insertError) {
                console.error('Error creating stats:', insertError);
            } else {
                console.log('Successfully created initial stats record');
            }
        } else {
            // Update existing stats
            const updateData = {
                total_events: existingStats.total_events + 1
            };

            // Increment the appropriate counter
            switch (eventType) {
                case 'page_view':
                    updateData.page_views = existingStats.page_views + 1;
                    break;
                case 'cta_click':
                    updateData.cta_clicks = existingStats.cta_clicks + 1;
                    break;
                case 'page_exit':
                    updateData.page_exits = existingStats.page_exits + 1;
                    break;
            }

            console.log('Updating stats:', {
                previous: existingStats,
                update: updateData
            });

            const { error: updateError } = await supabase
                .from('daily_stats')
                .update(updateData)
                .eq('id', existingStats.id);

            if (updateError) {
                console.error('Error updating stats:', updateError);
            } else {
                console.log('Successfully updated stats');
            }
        }
    } catch (error) {
        console.error('Error in updateDailyStats:', error);
    }
}

module.exports = updateDailyStats; 