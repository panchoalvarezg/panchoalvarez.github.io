<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  $sql = "SELECT * FROM usuarios WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows == 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user["password"])) {
      echo "Bienvenido, " . $user["username"] . ".";
    } else {
      echo "Contraseña incorrecta.";
    }
  } else {
    echo "Usuario no encontrado.";
  }
}
?>
