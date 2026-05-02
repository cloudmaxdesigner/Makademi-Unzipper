#!/usr/bin/env bash
# Sync the contents of makademi-website/ to the `hostinger-deploy` branch
# on origin so Hostinger's Git integration deploys it cleanly into
# public_html/. Run this from the repo root every time you want to push
# code changes to the live site.
#
# Usage:
#   ./scripts/sync-hostinger-deploy.sh
#
# What it does (idempotent):
#   1. Re-runs `git subtree split` to materialize the latest state of
#      makademi-website/ as a flat branch named `hostinger-deploy`.
#   2. Pushes that branch to origin with --force-with-lease so re-syncs
#      after any history change still succeed without clobbering anyone
#      else's pushes.
#   3. Reminds you to trigger the pull in hPanel.
#
# Safety:
#   - Never modifies `main` or any other branch.
#   - Refuses to run if the working tree has uncommitted changes inside
#     makademi-website/ (you'd be deploying something that isn't on main).

set -euo pipefail

PREFIX="makademi-website"
BRANCH="hostinger-deploy"
REMOTE="origin"

cd "$(git rev-parse --show-toplevel)"

# Sanity: makademi-website/ exists.
if [[ ! -d "$PREFIX" ]]; then
  echo "ERROR: '$PREFIX/' not found at repo root. Are you in the right repo?" >&2
  exit 1
fi

# Sanity: no uncommitted changes inside makademi-website/.
if ! git diff --quiet -- "$PREFIX" || ! git diff --cached --quiet -- "$PREFIX"; then
  echo "ERROR: You have uncommitted changes in $PREFIX/." >&2
  echo "       Commit or stash them first so the deploy branch matches main." >&2
  exit 1
fi

echo "==> Splitting $PREFIX/ into the $BRANCH branch..."
git branch -D "$BRANCH" 2>/dev/null || true
git subtree split --prefix="$PREFIX" -b "$BRANCH"

echo ""
echo "==> Pushing $BRANCH to $REMOTE..."
git push --force-with-lease "$REMOTE" "$BRANCH"

echo ""
echo "Done."
echo ""
echo "Next steps on the Hostinger side:"
echo "  1. hPanel -> Websites -> your domain -> Git."
echo "  2. Confirm the deployment branch is set to '$BRANCH' (one-time)."
echo "  3. Click 'Pull' (or wait for auto-pull if you have a webhook)."
echo ""
echo "Reminder: /admin/.installed and includes/config.php on the server"
echo "are NOT in this repo, so a pull will never overwrite them."
