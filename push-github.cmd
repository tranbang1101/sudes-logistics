@echo off

cd /d "%~dp0"

echo.
echo === UPDATE GITHUB ===
echo.

git add .
git commit -m "Update sudes-logistics"
git push

echo.
echo === HOAN TAT ===
pause
