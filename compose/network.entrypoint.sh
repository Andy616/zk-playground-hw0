#!/bin/sh

# using wget for docker health check
echo "deb http://archive.debian.org/debian stretch main contrib non-free" > /etc/apt/sources.list
apt update && apt install -y wget
rm -rf /var/lib/apt/lists/*

# the original entrypoint
node /app/dist/node/cli.js \
  --db=/ganache_data/network \
  --account_keys_path=/ganache_data/accounts.json \
  --hostname "0.0.0.0"
