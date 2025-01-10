<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Uključi db.php da se povežeš sa bazom
include('db.php');

try {
    // Priprema SQL upita za povlačenje svih podataka iz `purchases` tabele
    $query = "SELECT * FROM purchases";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Povlačenje svih podataka kao asocijativni niz
    $purchases = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Vraćanje podataka u JSON formatu
    echo json_encode($purchases);

} catch (PDOException $e) {
    // U slučaju greške, vrati odgovarajuću poruku
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}
?>
