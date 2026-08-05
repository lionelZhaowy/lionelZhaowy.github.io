#!/usr/bin/env sh
set -e

bundle _2.3.24_ check
bundle _2.3.24_ exec jekyll serve --livereload --host 127.0.0.1 --port 4000
