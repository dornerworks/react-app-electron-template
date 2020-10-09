#!/usr/bin/env bash

################################################################################
#                                                                     PREAMBLE #
set -eEuo pipefail
# set -x

cd $(git rev-parse --show-toplevel)
USAGE="
Usage: ${0##*/} [-a TEST] [-d]

  -a TEST:  test description, filename, or filename:linenumber
  -d:       connect to debugger
  -h:       print help and exit
  -u:       update shapshots
"

################################################################################
#                                                                      OPTIONS #
NODE_DEBUG=""
TO_TEST="all"
ADDL_ARGS=""

while getopts "a:dhu" arg; do # argument values stored in $OPTARG
  case $arg in
    a) TO_TEST="$OPTARG" ;;
    d) NODE_DEBUG="--inspect-brk" ;;
    h) echo $USAGE; exit ;;
    u) ADDL_ARGS+="-u" ;;
    *) echo $USAGE; exit 1 ;;
  esac
done

################################################################################
#                                                                       SCRIPT #

function runjest {
    JEST_CMD="node $NODE_DEBUG node_modules/.bin/jest --runInBand"
    echo -e "\e[1;34mRunning:\e[0;34m $JEST_CMD $@ $ADDL_ARGS\e[0m"
    eval $JEST_CMD $@ $ADDL_ARGS
}

function test_all {
    runjest
}

function test_file {
    runjest $1
}

function test_descr {
    runjest -t "'$1'"
}

function check_line_has_test {
    if [[ ! "$1" =~ ^[[:blank:]]*it ]] && [[ ! "$1" =~ ^[[:blank:]]*test ]]; then
        echo "File:Line $FILE:$LINE_NUM"
        echo " --> $LINE"
        echo "Does not contain a test definition."
        exit 1
    fi
}

function test_file_line {
    local FILE=${TO_TEST%%:[0-9]*}
    local LINE_NUM=$(echo $TO_TEST | cut -d: -f2)
    local LINE=$(sed -n "${LINE_NUM}p" $FILE)
    check_line_has_test "$LINE"
    local DESC=$(echo $LINE | cut -d\( -f2 | cut -d, -f1)
    runjest $FILE -t "$DESC"
}

if [[ "all" == "$TO_TEST" ]]; then
    test_all
elif [ -f "$TO_TEST" ]; then
    test_file $TO_TEST
elif [ -f "${TO_TEST%%:[0-9]*}" ]; then
    test_file_line $TO_TEST
else
    test_descr "$TO_TEST"
fi