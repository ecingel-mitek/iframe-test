document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startVerification');
    const statusDiv = document.getElementById('status');

    const generateGuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const updateStatus = (message, isError = false) => {
        statusDiv.textContent = message;
        statusDiv.className = `status ${isError ? 'error' : 'success'}`;
    };

    startButton.addEventListener('click', async () => {
        try {
            startButton.disabled = true;
            updateStatus('Initiating verification...');

            const payload = {
                reference: generateGuid(),
                callback_uri: "https://webhook.site/a43a7a3f-d9f2-4c7b-8f31-e6603c40c03a",
                name: "Willeke De Bruijn",
                email: "ecingel@icloud.com",
                environment: "production",
                use_defaults: true
            };

            const response = await fetch('https://eu-west.id.miteksystems.com/api/4.4/request/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('d0fd8f53-db5d-4473-a69b-c011f63bd113:7cebe5533e5191f2f84a89b840cad981')
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            updateStatus('Verification request created successfully!');
            
            // Close the window after a short delay to show the success message
            setTimeout(() => {
                window.close();
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            updateStatus(`Error: ${error.message}`, true);
            startButton.disabled = false;
        }
    });
}); 