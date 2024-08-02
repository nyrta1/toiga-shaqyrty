$(document).ready(function() {
    // Function to fetch data and update the table
    async function fetchData() {
        const url = 'https://dmzvqfthrlptjundmrmr.supabase.co/rest/v1/guests_answers';
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtenZxZnRocmxwdGp1bmRtcm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2MDQ2NDUsImV4cCI6MjAzODE4MDY0NX0.hHj218zyWSOQKfszx9_QhpdId0BGrjG5Vb7u_h31ma4';
        
        try {
            const originalUrl = new URL(window.location.href);
            const params = new URLSearchParams(originalUrl.search);
            const toiId = params.get('id');

            const response = await fetch(`${url}?toi_id=eq.${toiId}&select=*`, {
                headers: {
                    'apikey': apiKey,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Initialize or update the DataTable
            if ($.fn.DataTable.isDataTable('table')) {
                $('table').DataTable().clear().rows.add(data).draw();
            } else {
                $('table').DataTable({
                    data: data,
                    columns: [
                        { data: 'guest_full_name' },
                        { data: 'guests_partner_full_name' },
                        { 
                            data: 'is_comes',
                            render: function (data) {
                                return data ? 'Келеді ✅' : 'Келмейді ❌';
                            }
                        },
                    ],
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Kazakh.json"
                    },
                    responsive: true
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch data on page load
    fetchData();

    // Add event listener for refresh button
    $('#refreshButton').click(function() {
        fetchData();
    });
});
