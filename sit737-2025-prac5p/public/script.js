function convert() {
    const value = parseFloat(document.getElementById('value').value);
    const unitFrom = document.getElementById('unitFrom').value;
    const unitTo = document.getElementById('unitTo').value;

    if (isNaN(value) || value <= 0) {
        showError("Please enter a valid number greater than zero.");
        return;
    }

    const data = {
        value: value,
        unitFrom: unitFrom,
        unitTo: unitTo
    };

    // Clear any previous error messages
    clearError();

    // Send POST request to the server
    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.convertedValue !== undefined) {
                document.getElementById('convertedValue').innerText = result.convertedValue;
                document.getElementById('error').style.display = 'none';  // Hide error if successful
            } else if (result.error) {
                showError(result.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError("An error occurred while processing the conversion.");
        });
}

// Function to display error message in red
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = message;
    errorDiv.style.display = 'block'; // Show the error message
    document.getElementById('convertedValue').innerText = ''; // Clear the converted value
}

// Function to clear error message
function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none'; // Hide the error message
}