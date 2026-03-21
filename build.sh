#!/bin/sh
set -e

ZOLA_VERSION="0.22.1"

curl -sL "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-gnu.tar.gz" | tar xz
./zola build
