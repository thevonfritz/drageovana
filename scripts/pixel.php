<?php
declare(strict_types=1);

error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw   = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

$nome         = filter_var($input['nome']         ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$whatsapp     = filter_var($input['whatsapp']     ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
$procedimento = filter_var($input['procedimento'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

$allowed = ['botox', 'harmonizacao_glutea', 'preenchimento_labial', 'full_face', 'outros'];

if (empty($nome) || empty($whatsapp) || !in_array($procedimento, $allowed, true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Missing or invalid required fields']);
    exit;
}

// ── Meta Conversions API ──────────────────────────────────
$pixelId     = 'SEU_PIXEL_ID_AQUI';
$accessToken = 'SEU_ACCESS_TOKEN_AQUI';
$apiVersion  = 'v18.0';
$endpoint    = "https://graph.facebook.com/{$apiVersion}/{$pixelId}/events";

$phoneDigits = preg_replace('/\D/', '', $whatsapp);
$firstName   = strtolower(explode(' ', trim($nome))[0]);

$payload = [
    'data' => [
        [
            'event_name'       => 'Lead',
            'event_time'       => time(),
            'event_source_url' => 'https://seudominio.com',
            'event_id'         => uniqid('lead_', true),
            'action_source'    => 'website',
            'user_data'        => [
                'ph' => hash('sha256', $phoneDigits),
                'fn' => hash('sha256', $firstName),
            ],
            'custom_data'      => [
                'procedimento' => $procedimento,
                'lead_source'  => 'lp_dra_geovana'
            ]
        ]
    ],
    'access_token' => $accessToken
];

$ch = curl_init($endpoint);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$apiResponse = curl_exec($ch);
$httpCode    = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError   = curl_error($ch);
curl_close($ch);

if ($curlError) error_log("Meta API curl error: {$curlError}");
if ($httpCode >= 400) error_log("Meta API HTTP {$httpCode}: {$apiResponse}");

http_response_code(200);
echo json_encode(['success' => true]);
