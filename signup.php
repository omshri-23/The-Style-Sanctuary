<?php
// Database connection settings
$servername = 'localhost'; // Make sure to remove the colon after localhost
$username = 'root';        // Default username for XAMPP MySQL is 'root'
$password = '';            // Default password is empty
$dbname = 'database_name'; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize error message variable
$errorMessage = "";

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitize form inputs
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Validate form fields
    if (empty($username) || empty($email) || empty($password)) {
        $errorMessage = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = "Invalid email format.";
    } else {
        // Hash the password (for security)
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare SQL query to insert user into the database
        $stmt = $conn->prepare("INSERT INTO login (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        // Execute the query
        if ($stmt->execute()) {
            // Redirect to login page on successful signup
            header("Location: login.html");
            exit();
        } else {
            $errorMessage = "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>

<!-- HTML for displaying error message -->
<?php if ($errorMessage != ""): ?>
    <p style="color: red;"><?php echo $errorMessage; ?></p>
<?php endif; ?>
