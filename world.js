document.addEventListener('DOMContentLoaded', function () {
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');

    // Function to fetch data based on country and lookup type (country/cities)
    function fetchData(lookupType) {
        const countryName = countryInput.value.trim();
        
        if (countryName === "") {
            resultDiv.innerHTML = `
                <p class="alert-shake" style="color: #ff4500; font-size: 20px; font-weight: bold; text-align: center; 
                         background-color: #1b1b1b; padding: 15px; border: 2px solid #ff4500; 
                         border-radius: 5px; box-shadow: 0 0 10px rgba(255, 69, 0, 0.8);">
                    Please enter a country name.
                </p>
            `;
            // Add a class to the body to trigger the screen shake
            document.body.classList.add('shake-body');
            setTimeout(() => document.body.classList.remove('shake-body'), 1000); // Remove after 1 second
            return;
        }

        // Prepare URL for the request
        const url = `world.php?country=${encodeURIComponent(countryName)}&lookup=${lookupType}`;
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resultDiv.innerHTML = data; // Display the result
            })
            .catch(error => {
                resultDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
                console.error(error);
            });
    }

    // Event listener for the "Lookup" button (country info)
    lookupButton.addEventListener('click', function () {
        fetchData('country');
    });

    // Event listener for the "Lookup Cities" button
    lookupCitiesButton.addEventListener('click', function () {
        fetchData('cities');
    });
});
