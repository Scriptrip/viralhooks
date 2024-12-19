// Update the payment handler to work with direct redirects
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order');
    
    // Get package ID from localStorage
    const packageId = localStorage.getItem('current_package_id');
    
    if (orderId && packageId) {
        // Valid order and package, show content
        const accessButton = document.getElementById('accessButton');
        if (accessButton) {
            // Set the correct drive link based on package ID
            const driveLink = getDriveLink(packageId);
            accessButton.href = driveLink;
            
            // Clear the stored package ID
            localStorage.removeItem('current_package_id');
        }
    } else {
        // Invalid or missing parameters, show error
        document.querySelector('.thank-you-container').innerHTML = `
            <div class="error-icon">⚠️</div>
            <h1>Order Verification Failed</h1>
            <p>We couldn't verify your order details. Please contact support with your order number:</p>
            <p class="order-number">${orderId || 'Not available'}</p>
            <div class="support-info">
                <h3>Contact Support</h3>
                <p>Email: support@example.com</p>
                <p>Include your order number for faster assistance.</p>
            </div>
            <a href="index.html" class="access-button">Return to Homepage</a>
        `;
    }
});

function getDriveLink(packageId) {
    const driveLinks = {
        'sound_ar_100': 'https://drive.google.com/drive/folders/your-arabic-sounds-folder',
        'sound_en_100': 'https://drive.google.com/drive/folders/your-english-sounds-folder',
        'video_100': 'https://drive.google.com/drive/folders/your-100-videos-folder',
        'video_1000': 'https://drive.google.com/drive/folders/your-1000-videos-folder',
        'mix_100': 'https://drive.google.com/drive/folders/your-mix-100-folder',
        'mix_1000': 'https://drive.google.com/drive/folders/your-mix-1000-folder',
        'custom': 'https://drive.google.com/drive/folders/your-custom-package-folder'
    };
    
    return driveLinks[packageId] || '#';
} 