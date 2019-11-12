#!/bin/bash
# Install deps
yarn install

# yarn start

# Production build
yarn build

serve -S build -l 3000
