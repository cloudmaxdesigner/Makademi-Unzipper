# Pushing code updates to Hostinger via Git

This repo is a development monorepo. The actual website Hostinger needs to serve lives in the `makademi-website/` subfolder. To bridge those two facts, we keep two branches on GitHub:

| Branch | What's at the root | Purpose |
| --- | --- | --- |
| `main` | The full monorepo (`package.json`, `artifacts/`, `makademi-website/`, etc.) | Development. Source of truth. **Don't point Hostinger at this branch.** |
| `hostinger-deploy` | Only the contents of `makademi-website/` (`index.html`, `courses.php`, `admin/`, `includes/`, `db/`, `assets/`, ...) | Production. **This is what Hostinger pulls into `public_html/`.** |

The `hostinger-deploy` branch is generated automatically from `main` by a script — you never edit it by hand.

---

## One-time setup on Hostinger

You only do this once, after the `hostinger-deploy` branch exists on GitHub.

1. Sign in to **hPanel** (`https://hpanel.hostinger.com`).
2. Go to **Websites** → your domain → **Git** (under "Advanced" in the sidebar).
3. If you already connected the repo and it pulled the wrong files: click **Disconnect** first, then **Create Repository** to start fresh.
4. **Repository URL**: paste the GitHub repo URL (the same one as before).
5. **Branch**: type **`hostinger-deploy`** (not `main`).
6. **Install Path**: `public_html` (the default).
7. Click **Create**. Hostinger will pull the branch into `public_html/`. The root of `public_html/` should now contain `index.html`, `courses.php`, `admin/`, `includes/`, `db/`, `assets/`, etc. — and **no** `package.json` or `artifacts/` folder.
8. Visit your domain in a browser. You should see the Makademi homepage.

After this is done, follow `ADMIN_SETUP.md` (also in `public_html/` after the pull) to import the database and create your admin account. That part only happens once.

---

## Pushing future code updates

When we make a code change to the site (e.g. a new page, a styling tweak, a security patch), here's the full loop. **Note**: regular content edits — adding/removing courses, uploading gallery photos, editing text — do NOT need any of this. Those happen in the admin portal at `/admin/` and don't touch code.

### From the developer side

1. Make the code changes inside `makademi-website/` on the `main` branch.
2. Commit and push `main` to GitHub like normal.
3. Run the sync script from the repo root:
   ```bash
   ./scripts/sync-hostinger-deploy.sh
   ```
   This script reads the latest `makademi-website/` from `main`, re-publishes the `hostinger-deploy` branch with that content at the root, and pushes it to GitHub.

### On Hostinger

1. Sign in to hPanel → your domain → **Git**.
2. Click **Pull**. Hostinger fetches the new commit from `hostinger-deploy` and overwrites `public_html/`.
3. Refresh your site to confirm.

That's it.

---

## What does the sync script actually do?

```bash
git subtree split --prefix=makademi-website -b hostinger-deploy
git push --force-with-lease origin hostinger-deploy
```

In plain English:

- **`git subtree split`** takes the `makademi-website/` folder and re-creates it as a parallel branch where the folder's content sits at the root. It only touches the new branch — it never modifies `main`.
- **`git push --force-with-lease`** publishes the freshly-rebuilt branch to GitHub. The `--force-with-lease` flag is safe here because the deploy branch is a generated artifact of `main`; nothing else should be pushing to it.

The script also:

- Refuses to run if you have uncommitted changes inside `makademi-website/`, so you don't accidentally deploy something that isn't on `main`.
- Reminds you to trigger the pull on Hostinger when it finishes.

---

## Files that are intentionally NOT pushed

These three files exist on the Hostinger server but are NOT in the repo, so a pull will never overwrite them:

- **`includes/config.php`** — your DB credentials and `app_secret`. The repo only ships `config.example.php`. Keep your real `config.php` safe; if you ever lose it, copy `config.example.php` again and fill it in.
- **`admin/.installed`** — the marker that says "admin account already created". Created automatically when you run setup the first time.
- **`assets/images/gallery/<your-uploads>.jpg`** — anything an admin uploads via `/admin/gallery.php` lives only on the server. The 6 seed photos that ship in the repo (`firefighter-1.jpeg` … `firefighter-6.jpeg`) WILL be re-pulled if they're missing.

---

## Troubleshooting

**"After the pull, my site shows a directory listing instead of the homepage."**
The pull went into the wrong subfolder, or you pulled the wrong branch. Check Hostinger → Git: the deployment branch must be `hostinger-deploy`, not `main`. The Install Path must be `public_html` (not `public_html/something`).

**"After the pull, I get a 500 error."**
Almost always a typo in `includes/config.php`. The pull doesn't touch `config.php`, so this only happens if you edited it recently. Open it in File Manager and re-check `db_*` keys against `ADMIN_SETUP.md`.

**"The pull deleted my admin user / I can't log in anymore."**
That's not the pull — `admin_users` is a database row, not a file. Most likely you lost the password. Open phpMyAdmin → `admin_users` table → delete the row → also delete `public_html/admin/.installed` if present → revisit `/admin/setup-account.php` to create a new one.

**"I broke something and want to start over."**
You can always fall back to the original zip-upload workflow:
1. In hPanel → Git, click **Disconnect**.
2. Open File Manager, delete everything in `public_html/`.
3. Upload `makademi-website.zip` and extract it. Done — no Git involved.

The DB and `assets/images/gallery/` uploads survive any of this.
