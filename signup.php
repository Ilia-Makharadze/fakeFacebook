<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        echo "<script>alert(`all fields are required`);
        window.location.href='registration.html';
        </script>";
        exit;
    }

    

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $servername = "localhost";
    $username = "root";      
    $dbpassword = "";         
    $dbname = "usersdb";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    // check conncetion
    if ($conn->connect_error) {
        die("connection error " . $conn->connect_error);
    }

    // already is in database or not
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "<script>alert(`user with this email is already registered`) 
        window.location.href='registration.html';</script>";
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();

    
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    if ($stmt->execute()) {
        echo "<script>alert(`Registration Successful`);
               window.location.href='main.html';
        </script>";
    } else {
        echo "error " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
