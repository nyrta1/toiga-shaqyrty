const apiUrl = "https://dmzvqfthrlptjundmrmr.supabase.co/rest/v1/guests_answers";
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtenZxZnRocmxwdGp1bmRtcm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDQ2NDUsImV4cCI6MjAzODE4MDY0NX0.hHj218zyWSOQKfszx9_QhpdId0BGrjG5Vb7u_h31ma4";

// Function to GET data
async function getData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apikey': `${apikey}?select=*`,
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
document.getElementById('rsvpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Fetch the redirects JSON
    let redirectData;
    try {
        const response = await fetch('https://raw.githubusercontent.com/nyrta1/toiga-shaqyrty/main/redirects.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        redirectData = await response.json();
    } catch (error) {
        console.error('Failed to fetch redirects JSON:', error);
        return;
    }

    // Get the current site URL
    const siteUrl = window.location.href;

    // Check if the site URL matches any URL in the redirects JSON
    let matchingId = null;
    for (const [id, url] of Object.entries(redirectData)) {
        if (siteUrl.startsWith(url)) {
            matchingId = id;
            break;
        }
    }

    if (matchingId === null) {
        console.log("No matching ID found.");
        return;
    }

    console.log("Matching ID:", matchingId);

    const fullName = document.getElementById('fullName').value;
    const partnerFullName = document.getElementById('partnerFullName').value;
    const coming = document.querySelector('input[name="coming"]:checked').id === 'comingYes';

    const formData = {
        'guest_full_name': fullName,
        'guests_partner_full_name': partnerFullName,
        'is_comes': coming,
        'toi_id': matchingId
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'apikey': apikey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.status >200 && response.status < 300) {
        console.log("OK!");
        return;
    }
    console.log("BAD!")
});