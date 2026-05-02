<?php
declare(strict_types=1);

/**
 * Returns a singleton PDO connection driven by includes/config.php.
 * Throws on misconfiguration.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $cfg = require __DIR__ . '/config.php';
    $driver = $cfg['db_driver'] ?? 'mysql';

    if ($driver === 'sqlite') {
        $path = $cfg['sqlite_path'];
        $dir  = dirname($path);
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }
        $pdo = new PDO('sqlite:' . $path);
        $pdo->exec('PRAGMA foreign_keys = ON;');
    } elseif ($driver === 'mysql') {
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $cfg['db_host'],
            (int)$cfg['db_port'],
            $cfg['db_name'],
            $cfg['db_charset']
        );
        $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$cfg['db_charset']}",
        ]);
    } else {
        throw new RuntimeException("Unsupported db_driver: {$driver}");
    }

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    return $pdo;
}

/** Returns the loaded config array. */
function app_config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $cfg = require __DIR__ . '/config.php';
    }
    return $cfg;
}
