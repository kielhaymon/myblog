#!/bin/sh
set -ex

ZOLA_VERSION="0.22.1"

echo "=== Downloading Zola ==="
curl -sL -o zola.tar.gz "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
ls -la zola.tar.gz
tar xzf zola.tar.gz
ls -la zola

echo "=== Setting up theme ==="
if [ ! -f themes/zola-no-style-please/theme.toml ]; then
  rm -rf themes/zola-no-style-please
  git clone --depth 1 https://github.com/gumxcc/zola-no-style-please.git themes/zola-no-style-please
fi

echo "=== Building site ==="
./zola build
