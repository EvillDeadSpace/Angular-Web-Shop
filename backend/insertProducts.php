<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");

// Uključivanje datoteke za povezivanje s bazom
include 'db.php';

// Provjera je li zahtjev metodom POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dobijanje sirovih podataka (JSON)
    $data = json_decode(file_get_contents("php://input"));

    // Provjera je li JSON validan
    if (isset($data->product_name) && isset($data->image_url) && isset($data->price)) {
        // Dodela varijabli
        $product_name = $data->product_name;
        $image_url = $data->image_url;
        $price = $data->price;

        try {
            // SQL upit za unos podataka u tabelu
            $query = "INSERT INTO products (product_name, image_url, price) VALUES (:product_name, :image_url, :price)";

            // Priprema SQL upita
            $stmt = $pdo->prepare($query);

            // Bindenje parametara
            $stmt->bindParam(':product_name', $product_name);
            $stmt->bindParam(':image_url', $image_url);
            $stmt->bindParam(':price', $price);

            // Izvršavanje upita
            if ($stmt->execute()) {
                // Ako je uspješno
                echo json_encode(["message" => "Proizvod je uspješno dodan."]);
            } else {
                // Ako se dogodila greška pri izvršavanju
                echo json_encode(["message" => "Greška: Neuspješno dodavanje proizvoda."]);
            }
        } catch (PDOException $e) {
            // Ako se dogodila greška u vezi s PDO
            echo json_encode(["message" => "Greška: " . $e->getMessage()]);
        }
    } else {
        // Ako podaci nisu validni
        echo json_encode(["message" => "Podaci nisu ispravni."]);
    }
} else {
    // Ako nije poslan POST zahtjev
    echo json_encode(["message" => "Metoda zahtjeva nije POST."]);
}
?>
