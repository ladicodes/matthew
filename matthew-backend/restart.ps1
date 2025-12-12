# Restart Matthew backend server
Write-Host "Finding processes on port 8000..." -ForegroundColor Yellow
$port = 8000
$processIds = netstat -ano | findstr ":$port" | ForEach-Object { 
    $line = $_ -replace '\s+', ' '
    $parts = $line.Split(' ')
    $parts[-1]
} | Where-Object { $_ -match '^\d+$' } | Select-Object -Unique

foreach ($pid in $processIds) {
    if ($pid -ne "0") {
        Write-Host "Stopping process $pid..." -ForegroundColor Yellow
        try {
            Stop-Process -Id $pid -Force -ErrorAction Stop
        } catch {
            taskkill /F /PID $pid /T 2>$null
        }
    }
}

Start-Sleep -Seconds 2

Write-Host "Starting Matthew backend server on port $port..." -ForegroundColor Green
Set-Location "c:\Users\Harry Oghonyon\Music\matthew"
node src/server.js
