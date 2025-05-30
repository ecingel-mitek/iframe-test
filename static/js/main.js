document.addEventListener('DOMContentLoaded', () => {
    const launchButton = document.getElementById('launchWindow');
    const backendButton = document.getElementById('backendVerification');
    const backendStatus = document.getElementById('backendStatus');
    let verificationWindow = null;
    let currentVerificationUrl = null;

    const updateBackendStatus = (message, isError = false) => {
        backendStatus.textContent = message;
        backendStatus.className = `status ${isError ? 'error' : 'success'}`;
    };

    // Handle window launch
    launchButton.addEventListener('click', async () => {
        try {
            if (!currentVerificationUrl) {
                // If no verification URL exists, get one first
                launchButton.disabled = true;
                updateBackendStatus('Getting verification URL...');

                const response = await fetch('/api/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to get verification URL');
                }

                currentVerificationUrl = result.data.verificationUrl;
                updateBackendStatus('Verification URL received!');
            }

            // Calculate center position for the new window
            const width = 600;
            const height = 800;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            // Open the verification window with the Mitek URL
            verificationWindow = window.open(
                currentVerificationUrl,
                'MitekVerification',
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
            );

            // Check if the window was blocked
            if (!verificationWindow) {
                throw new Error('Please allow pop-ups for this website to launch the verification window.');
            }

            // Listen for the window to close
            const checkWindow = setInterval(() => {
                if (verificationWindow.closed) {
                    clearInterval(checkWindow);
                    launchButton.disabled = false;
                    // Clear the verification URL after window is closed
                    currentVerificationUrl = null;
                }
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            updateBackendStatus(`Error: ${error.message}`, true);
            launchButton.disabled = false;
        }
    });

    // Handle backend verification
    backendButton.addEventListener('click', async () => {
        try {
            backendButton.disabled = true;
            updateBackendStatus('Initiating backend verification...');

            const response = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create verification request');
            }

            // Store the verification URL for the launch button
            currentVerificationUrl = result.data.verificationUrl;
            updateBackendStatus('Verification URL received! You can now launch the verification window.');
            console.log('Backend verification response:', result.data);

        } catch (error) {
            console.error('Error:', error);
            updateBackendStatus(`Error: ${error.message}`, true);
        } finally {
            backendButton.disabled = false;
        }
    });
}); 