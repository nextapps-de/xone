@echo off
call task/build

xcopy bin\www\index.html apk\www\index.html /y
xcopy bin\www\css apk\www\css /y /e
xcopy bin\www\js apk\www\js /y /e
xcopy bin\www\img apk\www\img /y /e
xcopy bin\www\font apk\www\font /y /e

cd apk
call cordova build
call cordova run
cd ..
