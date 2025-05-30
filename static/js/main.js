document.addEventListener('DOMContentLoaded', () => {
    const launchButton = document.getElementById('launchWindow');
    let verificationWindow = null;

    launchButton.addEventListener('click', () => {
        // Calculate center position for the new window
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        // Open the verification window
        verificationWindow = window.open(
            'iframe.html',
            'MitekVerification',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
        );

        // Disable the launch button while the window is open
        launchButton.disabled = true;

        // Check if the window was blocked
        if (!verificationWindow) {
            alert('Please allow pop-ups for this website to launch the verification window.');
            launchButton.disabled = false;
            return;
        }

        // Listen for the window to close
        const checkWindow = setInterval(() => {
            if (verificationWindow.closed) {
                clearInterval(checkWindow);
                launchButton.disabled = false;
            }
        }, 500);
    });
}); 