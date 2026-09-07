param([Parameter(Mandatory=$true)][string]$SnapshotPath)
$ErrorActionPreference="Stop"
$Target=Join-Path $PSScriptRoot "..\data\status.json"
if(-not(Test-Path $SnapshotPath)){throw "Snapshot not found: $SnapshotPath"}
$snapshot=Get-Content $SnapshotPath -Raw|ConvertFrom-Json
if($snapshot.system_state.evidence_level -ne "E1"){throw "Public Alpha refuses non-E1 snapshot without a new reviewed release."}
if($snapshot.system_state.runtime_state -ne "UNKNOWN"){throw "Public Alpha refuses runtime state promotion automatically."}
if($snapshot.system_state.promotion_locked -ne $true){throw "Public Alpha requires promotion_locked=true."}
$status=Get-Content $Target -Raw|ConvertFrom-Json
$status.runtime.state="UNKNOWN";$status.runtime.evidence_level="E1";$status.v8.status="BLOCKED";$status.v24_1_transition.runtime_verified=$false
$status|ConvertTo-Json -Depth 12|Set-Content -Path $Target -Encoding UTF8
Write-Host "SYNC_OK: safe E1/UNKNOWN state synchronized. No promotion performed." -ForegroundColor Green
