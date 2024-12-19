document.addEventListener('DOMContentLoaded', function() {
    console.log('Thank you page loaded'); // Debug log
    
    // Get URL parameters from the callback
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check payment status
    const isSuccess = urlParams.get('success') === 'true';
    const txnResponseCode = urlParams.get('txn_response_code');
    const dataMessage = urlParams.get('data.message');
    const amountCents = parseInt(urlParams.get('amount_cents'));
    const orderId = urlParams.get('order');

    console.log('Amount cents:', amountCents); // Debug log

    // Map amount to package type (in EGP cents)
    const packageMap = {
        '5000': 'sound_ar_100',  // 1.99 USD
        '5500': 'sound_en_100',  // 1.99 USD
        '25500': 'video_100',     // 4.99 USD
        '77700': 'video_1000',   // 14.99 USD
        '26600': 'mix_100',   // 14.99 USD
        '122200': 'mix_1000',     // 24.99 USD
        '5599': 'custom'        // 55.99 USD
    };

    // Get package type based on amount
    const packageType = packageMap[amountCents.toString()];
    console.log('Package type:', packageType); // Debug log

    // Define drive links
    const driveLinks = {
        'sound_ar_100': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'sound_en_100': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'video_100': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'video_1000': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'mix_100': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'mix_1000': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing',
        'custom': 'https://drive.google.com/drive/folders/1_3MqL23YsTXNAv7YlaQVxEbpgaMCe2jM?usp=sharing'
    };

    const accessButton = document.getElementById('accessButton');
    console.log('Access button found:', !!accessButton); // Debug log
    console.log('Drive link for package:', driveLinks[packageType]); // Debug log

    if (isSuccess && txnResponseCode === 'APPROVED' && dataMessage === 'Approved') {
        console.log('Payment verified successfully'); // Debug log
        
        if (accessButton && packageType && driveLinks[packageType]) {
            console.log('Setting drive link for package:', packageType); // Debug log
            accessButton.href = driveLinks[packageType];
            
            // Add order information to the page
            const orderInfo = document.createElement('div');
            orderInfo.className = 'order-info';
            orderInfo.innerHTML = `
                <p>Order ID: ${orderId}</p>
                <p>Amount Paid: ${(amountCents/100).toFixed(2)} EGP</p>
                <p>Package Type: ${packageType.replace('_', ' ').toUpperCase()}</p>
                <p>👇👇Drive Link👇👇:</p>
                <a> ${driveLinks[packageType]}</a>

            `;
            
            const container = document.querySelector('.thank-you-container');
            const instructions = document.querySelector('.instructions');
            if (container && instructions) {
                container.insertBefore(orderInfo, instructions);
            }
        } else {
            console.log('Error: Missing package type or drive link'); // Debug log
            showError('Package information not found');
        }
    } else {
        console.log('Payment verification failed'); // Debug log
        showError('Payment verification failed');
    }
});

function showError(message) {
    const container = document.querySelector('.thank-you-container');
    if (container) {
        container.innerHTML = `
            <div class="error-icon">⚠️</div>
            <h1>Verification Error</h1>
            <p>${message}</p>
            <p>Please contact support with your order details:</p>
            <div class="support-info">
                <h3>Contact Support</h3>
                <p>Email: support@example.com</p>
            </div>
            <a href="index.html" class="access-button">Return to Homepage</a>
        `;
    }
} 