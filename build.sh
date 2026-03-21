#!/bin/sh
set -ex

ZOLA_VERSION="0.22.1"
URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz"

echo "=== Downloading Zola ==="
curl -sL -o zola.tar.gz "$URL"
file zola.tar.gz || true
gzip -t zola.tar.gz || true
tar -xzvf zola.tar.gz 2>&1 || { echo "tar failed, trying gunzip + tar"; gunzip -f zola.tar.gz && tar xvf zola.tar; }
chmod +x zola

echo "=== Setting up theme ==="
if [ ! -f themes/zola-no-style-please/theme.toml ]; then
  rm -rf themes/zola-no-style-please
  git clone --depth 1 https://github.com/gumxcc/zola-no-style-please.git themes/zola-no-style-please
fi

echo "=== Building site ==="
./zola build
