$clam = {& "E:\ClamAV\clamscan.exe" -i "E:" ; Get-Date }
& $clam | Out-File E:\clamlog.txt

