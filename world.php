<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

// Check if a country is passed via the GET request
if (isset($_GET['country'])) {
    $countryName = $_GET['country'];

    // If 'lookup' is set to 'cities', fetch cities data
    if (isset($_GET['lookup']) && $_GET['lookup'] === 'cities') {
        // SQL to get cities in the given country
        $stmt = $conn->prepare("SELECT c.name AS city_name, c.district, c.population 
                                FROM cities c 
                                JOIN countries co ON c.country_code = co.code 
                                WHERE co.name LIKE :country");
        $stmt->execute(['country' => '%' . $countryName . '%']);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Output cities data in a table
        if (count($results) > 0) {
            echo "<table><thead><tr><th>City Name</th><th>District</th><th>Population</th></tr></thead><tbody>";
            foreach ($results as $city) {
                echo "<tr><td>" . htmlspecialchars($city['city_name']) . "</td><td>" . htmlspecialchars($city['district']) . "</td><td>" . htmlspecialchars($city['population']) . "</td></tr>";
            }
            echo "</tbody></table>";
        } else {
            echo "No cities found.";
        }

    } else {
        // SQL to get country information
        $stmt = $conn->prepare("SELECT name, continent, independence_year, head_of_state FROM countries WHERE name LIKE :country");
        $stmt->execute(['country' => '%' . $countryName . '%']);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Output country data in a table
        if (count($results) > 0) {
            echo "<table><thead><tr><th>Country Name</th><th>Continent</th><th>Independence Year</th><th>Head of State</th></tr></thead><tbody>";
            foreach ($results as $country) {
                echo "<tr><td>" . htmlspecialchars($country['name']) . "</td><td>" . htmlspecialchars($country['continent']) . "</td><td>" . htmlspecialchars($country['independence_year']) . "</td><td>" . htmlspecialchars($country['head_of_state']) . "</td></tr>";
            }
            echo "</tbody></table>";
        } else {
            echo "No country found.";
        }
    }
} else {
    echo "Please provide a country name.";
}
?>
