<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");
// Uključivanje fajla za povezivanje s bazom
include 'db.php';

// Postavljanje Content-Type zaglavlja
header('Content-Type: application/json');

try {
    // SQL upit za povlačenje svih podataka iz tabele 'products'
    $query = "SELECT * FROM products";
    $statement = $pdo->prepare($query);
    $statement->execute();

    // Dohvatanje svih rezultata
    $products = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Vraćanje rezultata kao JSON
    echo json_encode($products);
} catch (Exception $e) {
    // U slučaju greške, vraćamo poruku greške
    echo json_encode(['error' => $e->getMessage()]);
}
?>