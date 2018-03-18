@ECHO off
SET /p workingDir=< cd.txt

TITLE yarn compile
CD %workingDir%
CALL yarn compile:start:server
@PAUSE