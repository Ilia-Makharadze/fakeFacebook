<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo "fill all field";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "write right email";
        exit;
    }

   
    $servername = "localhost";
    $username = "root";
    $dbpassword = "";
    $dbname = "usersdb";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        die("conection error: " . $conn->connect_error);
    }

    // find customer with email
    $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
    if (!$stmt) {
        die("Prepare failed: (" . $conn->errno . ") " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $name, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
           
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            

           
            echo "<script>alert('log in successfully');
            window.location.href = 'main.html';
            </script>";

        } else {
           echo "<script>alert('Incorrect password!');
           window.location.href = 'login.html';
           </script>";
        }
    } else {
       echo "<script>alert('User not found');
           window.location.href = 'login.html';
           </script>";
    }

    $stmt->close();
    $conn->close();
}
?>
