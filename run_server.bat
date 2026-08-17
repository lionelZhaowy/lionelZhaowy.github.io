@echo off
setlocal
set "JEKYLL_PORT=%~1"
if not defined JEKYLL_PORT set "JEKYLL_PORT=4200"

call bundle _2.3.24_ check || exit /b 1
call bundle _2.3.24_ exec jekyll serve --livereload --host 127.0.0.1 --port %JEKYLL_PORT%