@ECHO off
@ECHO %cd%> bat_files/cd.txt

START cmd /k call bat_files/yarn.bat
START cmd /k call bat_files/yarn_start.bat
START cmd /k call bat_files/yarn_compile.bat

START chrome http://127.0.0.1:3000/