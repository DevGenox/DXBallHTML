@echo off
start cmd.exe /k call NodeJS.bat
"%~dp0nodejs\MongoDB\Server\3.2\bin\mongod.exe" --storageEngine wiredTiger --syncdelay 3 --wiredTigerCacheSizeGB 2 --wiredTigerIndexPrefixCompression false --nojournal --dbpath "%~dp0nodejs\MongoDB\Server\3.2\data\db" 

pause

::--config "%~dp0mongodb\MongoDB\Server\3.2\bin\etc\mongod.conf"