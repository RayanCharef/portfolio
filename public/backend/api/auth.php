<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

// ─── RATE LIMITING ────────────────────────────────────────────
// Max 5 attempts per 15 minutes per IP
$ip = $_SERVER['REMOTE_ADDR'];
$maxAttempts = 5;
$timeWindow = 15 * 60; // 15 minutes in seconds

if ($method === 'POST') {
    // Clean up old attempts first
    $pdo->prepare("DELETE FROM login_attempts WHERE attempted_at < DATE_SUB(NOW(), INTERVAL 15 MINUTE)")
        ->execute();

    // Count recent attempts from this IP
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)");
    $stmt->execute([$ip]);
    $attempts = $stmt->fetchColumn();

    if ($attempts >= $maxAttempts) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many login attempts. Try again in 15 minutes.']);
        exit;
    }

    // Log this attempt
    $pdo->prepare("INSERT INTO login_attempts (ip, attempted_at) VALUES (?, NOW())")
        ->execute([$ip]);

    // Now check credentials
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    if (!$username || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Username and password required']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT * FROM admin WHERE username = ?');
    $stmt->execute([$username]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && password_verify($password, $admin['password'])) {
        // Success — clear attempts for this IP
        $pdo->prepare("DELETE FROM login_attempts WHERE ip = ?")
            ->execute([$ip]);

        $_SESSION['admin'] = true;
        $_SESSION['admin_id'] = $admin['id'];
        echo json_encode(['success' => true]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Wrong username or password']);
    }
    exit;
}

if ($method === 'GET') {
    echo json_encode(['logged_in' => isset($_SESSION['admin'])]);
    exit;
}

if ($method === 'DELETE') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}