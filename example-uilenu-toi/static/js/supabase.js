const apiUrl = "https://dmzvqfthrlptjundmrmr.supabase.co/rest/v1/guests_answers?select=*";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtenZxZnRocmxwdGp1bmRtcm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDQ2NDUsImV4cCI6MjAzODE4MDY0NX0.hHj218zyWSOQKfszx9_QhpdId0BGrjG5Vb7u_h31ma4";

// Function to GET data
async function getData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('GET Data:', data);
        return data;
    } catch (error) {
        console.error('GET Error:', error);
    }
}

// Function to POST data
async function postData(newData) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'apikey': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('POST Data:', data);
        return data;
    } catch (error) {
        console.error('POST Error:', error);
    }
}