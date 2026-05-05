<?php
/**
 * Replit dev-preview router for the PHP built-in server.
 *
 * The PHP built-in server (`php -S`) does NOT read .htaccess, so the
 * clean (extensionless) URLs used in production via mod_rewrite would
 * 404 in the Replit preview. This router mimics the .htaccess rules
 * just enough to make the local dev preview behave like Hostinger:
 *
 *   - /            → index.html        (DirectoryIndex)
 *   - /about       → about.html
 *   - /courses     → courses.php       (file beats the courses/ dir)
 *   - /admin/      → admin/index.php
 *   - /admin/login → admin/login.php
 *   - /assets/...  → served as-is
 *
 * It also performs the same 301 redirects from legacy *.php / *.html
 * URLs to their clean form, so the local preview matches production
 * canonical behavior.
 *
 * NOTE: This file is NOT used in production. On Hostinger (Apache),
 * .htaccess handles everything and this script is never invoked.
 */

$uri  = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH) ?? '/';
$qs   = parse_url($uri, PHP_URL_QUERY);
$root = __DIR__;

// 1) Legacy *.php / *.html URLs: 301 to clean form (preserve query string).
if (preg_match('#^(.*?)\.(php|html)$#i', $path, $m) && $m[1] !== '') {
    $clean = $m[1] . ($qs !== null ? '?' . $qs : '');
    header('Location: ' . $clean, true, 301);
    exit;
}

// 2) Real files (assets, etc.) — let the built-in server serve them.
//    Returning false here tells PHP "you handle it".
$filesystemPath = $root . $path;
if ($path !== '/' && is_file($filesystemPath)) {
    return false;
}

// 3) Directory or root → DirectoryIndex (index.php then index.html).
if ($path === '/' || (is_dir($filesystemPath) && substr($path, -1) === '/')) {
    foreach (['index.php', 'index.html'] as $idx) {
        $candidate = rtrim($filesystemPath, '/') . '/' . $idx;
        if (is_file($candidate)) {
            if (substr($idx, -4) === '.php') {
                chdir(dirname($candidate));
                $_SERVER['SCRIPT_NAME']     = rtrim($path, '/') . '/' . $idx;
                $_SERVER['SCRIPT_FILENAME'] = $candidate;
                $_SERVER['PHP_SELF']        = $_SERVER['SCRIPT_NAME'];
                require $candidate;
                exit;
            }
            return false;
        }
    }
}

// 4) Special case: /courses (and /courses/) must serve courses.php,
//    not the courses/ directory listing — same as the .htaccess rule.
if ($path === '/courses' || $path === '/courses/') {
    $candidate = $root . '/courses.php';
    if (is_file($candidate)) {
        chdir($root);
        $_SERVER['SCRIPT_NAME']     = '/courses.php';
        $_SERVER['SCRIPT_FILENAME'] = $candidate;
        $_SERVER['PHP_SELF']        = $_SERVER['SCRIPT_NAME'];
        require $candidate;
        exit;
    }
}

// 5) Extensionless URL → try .php then .html if such a file exists.
$trimmed = rtrim($path, '/');
if ($trimmed !== '') {
    foreach (['.php', '.html'] as $ext) {
        $candidate = $root . $trimmed . $ext;
        if (is_file($candidate)) {
            if ($ext === '.php') {
                chdir(dirname($candidate));
                $_SERVER['SCRIPT_NAME']     = $trimmed . $ext;
                $_SERVER['SCRIPT_FILENAME'] = $candidate;
                $_SERVER['PHP_SELF']        = $_SERVER['SCRIPT_NAME'];
                require $candidate;
                exit;
            }
            // .html — emit it directly. We can't `return false` because
            // the built-in server would then look up the original
            // (extensionless) path and 404; rewriting REQUEST_URI here
            // doesn't affect that lookup.
            header('Content-Type: text/html; charset=UTF-8');
            readfile($candidate);
            exit;
        }
    }
}

// 6) Nothing matched — render the 404 page (matches ErrorDocument).
http_response_code(404);
$err = $root . '/404.html';
if (is_file($err)) {
    readfile($err);
}
exit;
