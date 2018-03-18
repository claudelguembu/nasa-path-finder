@ECHO off
SET /p workingDir=< cd.txt

TITLE yarn start
CD %workingDir%
CALL yarn start
@PAUSE