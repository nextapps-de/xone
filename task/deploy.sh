#!/usr/bin/env bash

call task/build

xcopy public\www\index.html apk\www\index.html /y
xcopy public\www\css apk\www\css /y /e
xcopy public\www\js apk\www\js /y /e
xcopy public\www\img apk\www\img /y /e
xcopy public\www\font apk\www\font /y /e

cd apk
call cordova build
call cordova run
cd ..
