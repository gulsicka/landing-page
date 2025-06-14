// Generate a unique session ID
const sessionId = crypto.randomUUID();

// Track page load time
const pageLoadTime = Date.now();

// Active Viewers Counter
let currentViewers = null;

function updateViewers() {
    if (currentViewers === null) {
        // Generate a random number between 100 and 300 for active viewers
        currentViewers = Math.floor(Math.random() * 200) + 100;
    }
    
    // Add some random fluctuation to make it look more dynamic
    const fluctuation = Math.random() > 0.5 ? 1 : -1;
    currentViewers = Math.max(100, Math.min(300, currentViewers + fluctuation));
    
    document.getElementById('activeViewers').textContent = currentViewers;
}

// Update viewers every 30 seconds to show activity
setInterval(updateViewers, 30000);
updateViewers(); // Initial call

// Flash Sale Timer
function updateTimer() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const timeLeft = midnight - now;
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// Track time spent on page
let timeSpent = 0;
const timeInterval = setInterval(() => {
    timeSpent += 1;
}, 1000);

// Function to format duration
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    let duration = '';
    if (hours > 0) duration += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) duration += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    if (remainingSeconds > 0 || duration === '') duration += `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    
    return duration.trim();
}

// Function to log events to the backend
async function logEvent(eventType, additionalData = {}) {
    try {
        const response = await fetch('/api/logEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: eventType,
                session_id: sessionId,
                timestamp: new Date().toISOString(),
                duration: formatDuration(timeSpent),
                ...additionalData
            })
        });

        if (!response.ok) {
            console.error('Failed to log event:', await response.text());
        }
    } catch (error) {
        console.error('Error logging event:', error);
    }
}

// Log page view when the page loads
document.addEventListener('DOMContentLoaded', () => {
    logEvent('page_view');
});

// Track all CTA button clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        const section = button.closest('section');
        const sectionName = section.querySelector('h2')?.textContent || 'unknown_section';
        logEvent('cta_click', { 
            button_id: button.id || 'cta-button',
            section: sectionName
        });
        window.location.href = 'https://www.amazon.com/ODDS-Shifter-Featuring-Rechargeable-Indicator/dp/B0CWS7ZJTV?maas=maas_adg_C145EEC56A111949CD5C5C5FF0D05E46_afap_abs&ref_=aa_maas&tag=maas&th=1';
    });
});

// Track when user leaves the page
window.addEventListener('beforeunload', () => {
    logEvent('page_exit', { time_spent: formatDuration(timeSpent) });
    clearInterval(timeInterval);
}); 