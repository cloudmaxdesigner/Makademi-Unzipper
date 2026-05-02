<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/csrf.php';
require_once __DIR__ . '/../includes/helpers.php';

// Pages that include this header expect to be admin-only — except setup/login.
$basename = basename($_SERVER['SCRIPT_NAME'] ?? '');
$publicAdminPages = ['login.php', 'setup-account.php'];
if (!in_array($basename, $publicAdminPages, true)) {
    require_admin();
}

$active = $active_admin_nav ?? '';
function _adm_nav(string $key, string $a): string { return $key === $a ? 'active' : ''; }
$me = current_admin();
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($admin_page_title ?? 'Makademi Admin') ?></title>
  <link rel="icon" href="../favicon.ico" sizes="48x48">
  <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body class="admin">
  <div class="admin-shell">
    <header class="admin-topbar">
      <a href="index.php" class="brand">Makademi Admin <small>Content Manager</small></a>
      <nav>
        <a href="index.php" class="<?= _adm_nav('dashboard', $active) ?>">Dashboard</a>
        <a href="programs.php" class="<?= _adm_nav('programs', $active) ?>">Programs</a>
        <a href="gallery.php" class="<?= _adm_nav('gallery', $active) ?>">Gallery</a>
      </nav>
      <div class="meta">
        <a href="../index.html" target="_blank" rel="noopener">View site</a>
        <span>Hi, <?= e($me['username']) ?></span>
        <form method="post" action="logout.php" class="logout-form" style="display:inline">
          <?= csrf_field() ?>
          <button type="submit" class="link-button">Sign out</button>
        </form>
      </div>
    </header>
    <main class="admin-main">
<?php
foreach (flash_take() as $f) {
    $kind = in_array($f['kind'], ['success','error','info'], true) ? $f['kind'] : 'info';
    echo '<div class="admin-flash ' . $kind . '">' . e($f['msg']) . '</div>';
}
?>
