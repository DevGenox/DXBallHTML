@echo off
start chrome "http://127.0.0.1:8080/"
cd "%~dp0nodejs\"
node server.js

pause