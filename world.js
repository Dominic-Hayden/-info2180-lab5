/* 
  Author: Dominic Hayden
  GIT: https://github.com/Dominic-Hayden/-info2180-lab5.git
*/

document.addEventListener('DOMContentLoaded', function () {
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');

    // Function to fetch data based on country and lookup type (country/cities)
    function fetchData(lookupType) {
        const countryName = countryInput.value.trim();
        
        // If the country input is empty, pass an empty string to fetch all countries or cities
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
