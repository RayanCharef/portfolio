<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

// GET - fetch all projects (public)
if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM projects ORDER BY created_at DESC');
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert tags from string to array
    foreach ($projects as &$project) {
        $project['tags'] = $project['tags'] ? explode(',', $project['tags']) : [];
    }

    echo json_encode($projects);
    exit;
}

// Everything below requires admin login
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// POST - add new project
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $tags = isset($data['tags']) ? implode(',', $data['tags']) : '';
    $code = $data['code'] ?? '';
    $images = $data['images'] ?? '';

    if (!$title || !$description) {
        http_response_code(400);
        echo json_encode(['error' => 'Title and description required']);
        exit;
    }

    $stmt = $pdo->prepare('INSERT INTO projects (title, description, tags, code, images) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$title, $description, $tags, $code, $images]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId()
    ]);
    exit;
}

// DELETE - delete a project
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Project ID required']);
        exit;
    }

    $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$id]);

    echo json_encode(['success' => true]);
    exit;
}