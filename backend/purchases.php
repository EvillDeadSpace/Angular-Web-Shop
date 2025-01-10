<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Uključi db.php da se povežeš sa bazom
include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Proveri da li su svi potrebni podaci poslati u POST-u
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username']) && isset($data['product_name']) && isset($data['purchase_date'])) {
        $username = $data['username'];
        $product_name = $data['product_name'];
        $purchase_date = $data['purchase_date'];

        try {
            // Priprema i izvršavanje SQL upita
            $query = "INSERT INTO purchases (username, product_name, purchase_date) VALUES (:username, :product_name, :purchase_date)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':product_name', $product_name);
            $stmt->bindParam(':purchase_date', $purchase_date);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Purchase recorded successfully"]);
            } else {
                echo json_encode(["message" => "Failed to record purchase"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["message" => "All fields are required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
