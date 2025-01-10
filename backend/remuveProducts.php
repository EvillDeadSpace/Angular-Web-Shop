<?php
// filepath: /C:/xampp/htdocs/api/remuveProducts.php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Obrada preflight zahtjeva
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Uključivanje datoteke za povezivanje s bazom
include 'db.php';

// Provjera je li zahtjev metodom POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dobijanje sirovih podataka (JSON)
    $data = json_decode(file_get_contents("php://input"));

    // Provjera je li JSON validan i sadrži ID
    if (isset($data->id)) {
        $id = $data->id;

        try {
            // SQL upit za brisanje proizvoda iz tabele
            $query = "DELETE FROM products WHERE id = :id";

            // Priprema SQL upita
            $stmt = $pdo->prepare($query);

            // Bindenje parametara
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            // Izvršavanje upita
            if ($stmt->execute()) {
                // Postavljanje odgovora
                http_response_code(200);
                echo json_encode(["message" => "Product deleted successfully."]);
            } else {
                // Postavljanje odgovora
                http_response_code(400);
                echo json_encode(["message" => "Unable to delete product."]);
            }
        } catch (PDOException $e) {
            // Postavljanje odgovora
            http_response_code(500);
            echo json_encode(["message" => "Server error: " . $e->getMessage()]);
        }
    } else {
        // Postavljanje odgovora
        http_response_code(400);
        echo json_encode(["message" => "Invalid input. ID is required."]);
    }
} else {
    // Postavljanje odgovora
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
}
?>
