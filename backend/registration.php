<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");
// Uključivanje konekcije na bazu
include 'db.php'; // Pretpostavljamo da ovdje već imate $pdo definisan

// Provjera metode zahtjeva
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Uzimanje sirovog JSON ulaza
    $json = file_get_contents('php://input');
    $data = json_decode($json, true); // Pretvaranje JSON-a u asocijativni niz

    // Provjera da li su potrebni podaci prisutni
    if (isset($data['username'], $data['email'], $data['password'])) {
        $user = $data['username'];
        $email = $data['email'];
        $pass = $data['password'];

        // Pripremljena izjava za unos podataka
        $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $pdo->prepare($sql);

        // Veza parametara sa vrijednostima
        $stmt->bindParam(':username', $user);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $pass);

        // Izvršavanje upita
        if ($stmt->execute()) {
            echo json_encode(["message" => "Registracija uspješna!"]);
        } else {
            echo json_encode(["error" => "Greška prilikom registracije."]);
        }
    } else {
        echo json_encode(["error" => "Nedostaju podaci."]);
    }
} else {
    echo json_encode(["error" => "Nepodržana metoda zahtjeva."]);
}
?>
