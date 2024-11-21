// Initialize World ID widget
window.onload = function () {
    const worldID = new window.WorldID({
        action_id: "your-action-id", // Replace with your Action ID from Worldcoin Developer Portal
        signal: "user-login", // Unique signal for this action
        enable_telemetry: true, // Enable telemetry for analytics (optional)
        container: "world-id-container", // The ID of the div where the widget will be embedded
        app_name: "YourAppName", // Replace with your app name
        on_success: (verificationResponse) => {
            console.log("Verification Success:", verificationResponse);
            handleVerification(verificationResponse);
        },
        on_error: (error) => {
            console.error("Verification Error:", error);
        },
    });
};

// Function to send verification response to backend
function handleVerification(verificationResponse) {
    fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ response: verificationResponse }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Login Successful!");
                // Redirect or handle logged-in user
            } else {
                alert("Login Failed: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Error during login:", error);
        });
}