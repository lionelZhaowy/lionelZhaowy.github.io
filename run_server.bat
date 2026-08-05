@echo off
call bundle _2.3.24_ check || exit /b 1
call bundle _2.3.24_ exec jekyll serve --livereload --host 127.0.0.1 --port 4000
