#!/bin/sh
# muse-for-linux launcher (user-local install)
cd /home/thanic/Projects/muse-for-linux || exit 1
exec ./node_modules/.bin/electron . "$@"
