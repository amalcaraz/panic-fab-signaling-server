#!/usr/bin/env bash
# set -e

if [ "$1" = 'dev' ]; then

    yarn install
    # yarn run build-ts
    yarn run serve-dev

else

    exec "$@"

fi