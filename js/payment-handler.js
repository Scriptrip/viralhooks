// Create a new file for handling payment responses
function handlePayMobResponse() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if payment was successful
    const isSuccess = urlParams.get('success') === 'true';
    const txnResponseCode = urlParams.get('txn_response_code');
    const dataMessage = urlParams.get('data.message');
    
    if (isSuccess && txnResponseCode === 'APPROVED' && dataMessage === 'Approved') {
        // Get order details from URL
        const orderId = urlParams.get('order');
        const packageId = localStorage.getItem('selected_package');
        
        // Redirect to thank you page with package information
        window.location.href = `thank-you.html?package=${packageId}&order=${orderId}`;
    } else {
        // Handle failed payment
        window.location.href = 'payment-failed.html';
    }
}

// Call the handler when the page loads
document.addEventListener('DOMContentLoaded', handlePayMobResponse); 