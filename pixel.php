<?php
/**
 * pixel.php — Meta Conversions API (CAPI) endpoint
 *
 * Recebe os dados do formulário e envia o evento "Lead" para a Meta
 * Conversions API, com hash SHA-256 de PII conforme exigido.
 *
 * Configure as variáveis abaixo antes de publicar.
 */

declare(strict_types=1);
header('Content-Type: application/json');

// ====== CONFIG ======
const META_PIXEL_ID    = 'PIXEL_ID';                         // ID do Pixel
const META_ACCESS_TOKEN = 'EAAXXXXXXXXXXXXX';                // Token CAPI
const META_API_VERSION  = 'v18.0';
const ALLOWED_ORIGIN    = '';                                // ex: https://dragecamargo.com.br

if (ALLOWED_ORIGIN !== '') {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ====== INPUT (sanitização) ======
$name      = trim((string)filter_input(INPUT_POST, 'name',      FILTER_SANITIZE_SPECIAL_CHARS));
$phone     = trim((string)filter_input(INPUT_POST, 'phone',     FILTER_SANITIZE_SPECIAL_CHARS));
$procedure = trim((string)filter_input(INPUT_POST, 'procedure', FILTER_SANITIZE_SPECIAL_CHARS));

if ($name === '' || $phone === '' || $procedure === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

// Normaliza telefone (apenas dígitos, com país)
$phoneDigits = preg_replace('/\D+/', '', $phone);
if (strlen($phoneDigits) === 11) {
    $phoneDigits = '55' . $phoneDigits; // BR
}

function h(string $v): string {
    return hash('sha256', mb_strtolower(trim($v)));
}

// ====== PAYLOAD CAPI ======
$payload = [
    'data' => [[
        'event_name'  => 'Lead',
        'event_time'  => time(),
        'action_source' => 'website',
        'event_source_url' => $_SERVER['HTTP_REFERER'] ?? '',
        'user_data' => [
            'ph' => [h($phoneDigits)],
            'fn' => [h($name)],
            'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
            'fbp' => $_COOKIE['_fbp'] ?? null,
            'fbc' => $_COOKIE['_fbc'] ?? null,
        ],
        'custom_data' => [
            'content_name'     => $procedure,
            'content_category' => 'Avaliação',
            'currency'         => 'BRL',
            'value'            => 0,
        ],
    ]],
];

$url = sprintf(
    'https://graph.facebook.com/%s/%s/events?access_token=%s',
    META_API_VERSION,
    META_PIXEL_ID,
    urlencode(META_ACCESS_TOKEN)
);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_TIMEOUT        => 8,
]);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo json_encode(['ok' => $status === 200, 'meta' => json_decode($response, true)]);
