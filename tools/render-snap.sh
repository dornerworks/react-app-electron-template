#!/usr/bin/env bash

set -eEuo pipefail
# set -x

TMP=$(git rev-parse --show-toplevel)/tmp
mkdir -p $TMP
$(dirname "$0")/render-snap.js ${1%%:[0-9]*} > $TMP/render.html

OPEN=${BRWOSER:-firefox}
$OPEN $TMP/render.html