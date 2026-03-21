#!/bin/sh
set -e

ZOLA_VERSION="0.22.1"

curl -sL "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz" | tar xz
chmod +x zola

if [ ! -f themes/zola-no-style-please/theme.toml ]; then
  rm -rf themes/zola-no-style-please
  git clone --depth 1 https://github.com/gumxcc/zola-no-style-please.git themes/zola-no-style-please
fi

./zola build
