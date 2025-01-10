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
    if (isset($data['email'], $data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        // Pripremljena izjava za provjeru korisnika
        $sql = "SELECT * FROM users WHERE email = :email AND password = :password";
        $stmt = $pdo->prepare($sql);

        // Veza parametara sa vrijednostima
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        // Izvršavanje upita
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode([
                "status" => "success",
                "message" => "Login uspješan!",
                "user" => $user
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Pogrešan email ili lozinka."
            ]);
        }
        
    } else {
        echo json_encode(["error" => "Nedostaju podaci."]);
    }
} else {
    echo json_encode(["error" => "Nepodržana metoda zahtjeva."]);
}
?>
