<?php
// Start the session to store login data
session_start();

// Database connection settings
$servername = "localhost";
$db_username = "root";  // Default username for XAMPP MySQL is 'root'
$db_password = "";      // Default password is empty
$dbname = "database_name"; // Replace with your database name

// Create a connection to the database
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form values
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username exists in the database
    $stmt = $conn->prepare("SELECT * FROM login WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();
        
        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Password is correct, log the user in
            $_SESSION['username'] = $username;
            // Redirect to dashboard or home page
            header("Location: shop.html");  // Change this to the page you want to redirect to
            exit();
        } else {
            // Password incorrect
            header("Location: login.php?error=Invalid%20password.");
            exit();
        }
    } else {
        // Username not found
        header("Location: login.php?error=Username%20not%20found.");
        exit();
    }

    $stmt->close();
}

// Close the database connection
$conn->close();
?>
