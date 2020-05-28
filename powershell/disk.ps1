
$properties=@(
    @{Name="1"; Expression = {"|||"}},
    @{Name="Process Name"; Expression = {$_.DeviceID}}
)
Get-WmiObject Win32_logicaldisk | 
    Select-Object $properties 
