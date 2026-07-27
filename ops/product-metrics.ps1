[CmdletBinding()]
param(
    [switch]$Local
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$SqlPath = Join-Path $PSScriptRoot "product-metrics.sql"
$Wrangler = Join-Path $RepoRoot "node_modules\.bin\wrangler.cmd"
$Target = if ($Local) { "--local" } else { "--remote" }
$Sql = (Get-Content $SqlPath) -join " "

$Output = & $Wrangler d1 execute sky-dial $Target --json --command $Sql
if ($LASTEXITCODE -ne 0) {
    throw "D1 metrics query failed with exit code $LASTEXITCODE"
}

$Payload = ($Output -join [Environment]::NewLine) | ConvertFrom-Json
$Row = $Payload[0].results[0]
if (-not $Row) {
    throw "D1 metrics query returned no result"
}

function Get-Percent {
    param(
        [int]$Numerator,
        [int]$Denominator
    )

    if ($Denominator -eq 0) { return 0.0 }
    return [Math]::Round(($Numerator / $Denominator) * 100, 1)
}

$Users = [int]$Row.users
$Results = [int]$Row.results_shown
$Opened = [int]$Row.feed_opened

[ordered]@{
    generated_at = (Get-Date).ToUniversalTime().ToString("o")
    service = "sky-dial"
    environment = if ($Local) { "local" } else { "production" }
    funnel = [ordered]@{
        users = $Users
        results_shown = $Results
        feed_opened = $Opened
        feed_saved = [int]$Row.feed_saved
        returned = [int]$Row.returned
        users_7d = [int]$Row.users_7d
        feed_opened_7d = [int]$Row.feed_opened_7d
    }
    rates = [ordered]@{
        results_percent = Get-Percent $Results $Users
        open_percent = Get-Percent $Opened $Results
        save_percent = Get-Percent ([int]$Row.feed_saved) $Results
        return_percent = Get-Percent ([int]$Row.returned) $Users
    }
} | ConvertTo-Json -Depth 4
