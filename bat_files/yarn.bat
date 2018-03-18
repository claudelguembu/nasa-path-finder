@ECHO off
SET /p workingDir=< cd.txt

TITLE yarn
CD %workingDir%
CALL yarn
@PAUSE

