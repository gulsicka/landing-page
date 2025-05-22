const axios = require('axios');
const { exec } = require('child_process');

// Test cases with different user agents
const testCases = [
    {
        name: 'Google Bot',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
    },
    {
        name: 'Bing Bot',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
        }
    },
    {
        name: 'Python Requests',
        headers: {
            'User-Agent': 'python-requests/2.28.1'
        }
    },
    {
        name: 'Curl',
        headers: {
            'User-Agent': 'curl/7.64.1'
        }
    },
    {
        name: 'Regular Browser (Chrome)',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    }
];

// Function to test with axios
async function testWithAxios(testCase) {
    try {
        console.log(`\nTesting with ${testCase.name}:`);
        console.log('Headers:', testCase.headers);
        
        const response = await axios.get('http://localhost:3000', {
            headers: testCase.headers
        });
        
        // Check if the response contains the blog content
        const isBlogContent = response.data.includes('Pawsome Playhouse');
        console.log('Result:', isBlogContent ? 'Saw blog content (Bot detected)' : 'Saw redirect page (Real user)');
        console.log('Response length:', response.data.length);
    } catch (error) {
        console.error(`Error testing ${testCase.name}:`, error.message);
    }
}

// Function to test with curl
function testWithCurl(testCase) {
    const userAgent = testCase.headers['User-Agent'];
    const command = `curl -A "${userAgent}" http://localhost:3000`;
    
    console.log(`\nTesting with curl (${testCase.name}):`);
    console.log('Command:', command);
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        
        const isBlogContent = stdout.includes('Pawsome Playhouse');
        console.log('Result:', isBlogContent ? 'Saw blog content (Bot detected)' : 'Saw redirect page (Real user)');
        console.log('Response length:', stdout.length);
    });
}

// Run all tests
async function runTests() {
    console.log('Starting bot detection tests...\n');
    
    // Test with axios
    console.log('=== Testing with Axios ===');
    for (const testCase of testCases) {
        await testWithAxios(testCase);
    }
    
    // Test with curl
    console.log('\n=== Testing with Curl ===');
    for (const testCase of testCases) {
        testWithCurl(testCase);
    }
}

// Run the tests
runTests(); 