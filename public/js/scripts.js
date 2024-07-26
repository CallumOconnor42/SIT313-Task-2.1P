document.getElementById('subscribeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('Welcome email sent successfully');
        } else {
            alert('Error sending welcome email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending welcome email');
    }
});