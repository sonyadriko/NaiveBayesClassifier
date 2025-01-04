<?php
session_start();
include '../config/db_connection.php';

// Ensure the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input and sanitize
    $email = $_POST['email'];
    $password = $_POST['password'];

    error_log("Received POST request with email: $email");

    // Check email and password in the database
    if ($stmt = $conn->prepare('SELECT id_users, password, role FROM users WHERE email = ?')) {
        error_log("Prepared statement created successfully");

        // Bind parameters (s = string, i = int, b = blob, etc)
        $stmt->bind_param('s', $email);
        $stmt->execute();
        error_log("Executed statement with email: $email");

        // Store the result so we can check if the account exists in the database.
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            error_log("User found with email: $email");

            $stmt->bind_result($id, $hashed_password, $role);
            $stmt->fetch();

            // Check if $hashed_password is not null
            if ($hashed_password !== null) {
                // Verify password
                if (md5($password) === $hashed_password) {
                    error_log("Password verified for user ID: $id");

                    // Create sessions
                    session_regenerate_id();
                    $_SESSION['loggedin'] = TRUE;
                    $_SESSION['name'] = $email;
                    $_SESSION['id'] = $id;
                    $_SESSION['role'] = $role;
                    header('Location: index.php?login=success');
                    exit();
                } else {
                    error_log("Incorrect password for email: $email");
                    header('Location: login.php?login=failed');
                    exit();
                }
            } else {
                error_log("Password hash is null for email: $email");
                header('Location: login.php?login=failed');
                exit();
            }
        } else {
            error_log("No user found with email: $email");
            header('Location: login.php?login=failed');
            exit();
        }
        $stmt->close();
    } else {
        error_log("Error in prepared statement: " . $conn->error);
        header('Location: login.php?login=failed');
        exit();
    }
} else {
    error_log("No POST request received");
    header('Location: login.php');
    exit();
}
?>
