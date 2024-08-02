// Get the current site URL
const siteUrl = window.location.href;
const apiUrl = "https://dmzvqfthrlptjundmrmr.supabase.co/rest/v1/guests_answers";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtenZxZnRocmxwdGp1bmRtcm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDQ2NDUsImV4cCI6MjAzODE4MDY0NX0.hHj218zyWSOQKfszx9_QhpdId0BGrjG5Vb7u_h31ma4";

// Function to GET data
async function getData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'apiKey': apiKey,
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

    let matchingId = null;
    for (const [id, url] of Object.entries(redirectData)) {
        if (siteUrl.startsWith(url)) {
            matchingId = id;
            break;
        }
    }

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
            'apiKey': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const responseStatus = await response.status;

    if (responseStatus < 200 || responseStatus > 299) {
        alert("Что-то пошло не так 😥");
        return;
    }

    window.dialog.showModal();
    document.getElementById('question-for-form').style.display = 'none';
    document.querySelector('.form-container').style.display = 'none';
});