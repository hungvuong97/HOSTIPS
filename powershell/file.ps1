
$properties=@(
    @{Name="1"; Expression = {"|||"}},
    @{Name="Name"; Expression = {$_.Name}},
    @{Name="2"; Expression = {"||"}},
    @{Name="Time"; Expression = {$_.LastWriteTime.ToString("yyyy-MM-dd")}},
    @{Name="3"; Expression = {"||"}},
    @{Name="Large"; Expression = {$_.Length}}
)
Get-ChildItem . | Select-Object $properties  | Format-Table -AutoSize
