<?php
session_start();
include '../config/db_connection.php';

// Pastikan metode yang digunakan adalah POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cek CSRF Token
    if (!isset($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        header('Location: login.php?login=failed');
        exit();
    }

    // Ambil input user dan lakukan sanitasi
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Cek input email dan password pada database
    if ($stmt = $conn->prepare('SELECT id, password FROM users WHERE email = ?')) {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Ambil hasil query
            $stmt->bind_result($id, $hashed_password);
            $stmt->fetch();

            // Verifikasi password dengan md5
            if (md5($password) === $hashed_password) {
                // Simpan informasi ke session jika login berhasil
                session_regenerate_id();
                $_SESSION['loggedin'] = true;
                $_SESSION['id'] = $id;
                $_SESSION['email'] = $email;

                // Arahkan pengguna ke index.php setelah login berhasil
                header('Location: index.php');
                exit();
            } else {
                // Jika password salah
                header('Location: login.php?login=failed');
                exit();
            }
        } else {
            // Jika email tidak ditemukan
            header('Location: login.php?login=failed');
            exit();
        }
    } else {
        // Jika statement SQL gagal dipersiapkan
        error_log("Error in prepared statement: " . $conn->error);
        header('Location: login.php?login=failed');
        exit();
    }
} else {
    header('Location: login.php');
    exit();
}
?>
