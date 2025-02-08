set word=table
set str="jump over the chair"
call set str=%%str:chair=%word%%%
echo %str%

set "temp1=project_Name_-_sofeware_Name.txt"
set "dummy=%temp1:_-_=" & set "temp2=%"
echo %temp2%
