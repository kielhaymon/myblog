#!/bin/sh
set -e

ZOLA_VERSION="0.22.1"

# Install Zola
curl -sL "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar xz

# Ensure submodules are initialized (Vercel doesn't clone them by default)
git submodule update --init --recursive 2>/dev/null || true

# If submodule is empty, download the theme directly
if [ ! -f themes/zola-no-style-please/theme.toml ]; then
  rm -rf themes/zola-no-style-please
  git clone https://github.com/gumxcc/zola-no-style-please.git themes/zola-no-style-please
fi

./zola build
