# Matthew backend test script (Windows / PowerShell)
# Ensure your server is running on 127.0.0.1:8000 before running

$baseUrl = "http://127.0.0.1:8000"

Write-Host "`n=== Testing Matthew Backend ===`n"

# 1️⃣ Health Check
Write-Host "1. Health Check..."
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method GET
    Write-Host "Success:" $response.success
    Write-Host "Message:" $response.message
    Write-Host "Version:" $response.version
    Write-Host "Endpoints:" ($response.endpoints | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "Error: Unable to reach server. Make sure backend is running on 127.0.0.1:8000"
}

# 2️⃣ Tax Calculation (SME)
Write-Host "`n2. Tax Calculation (SME: ₦10M revenue)..."
$taxPayload = @{
    revenue = 10000000
    profit = 2000000
    capitalGains = 500000
    digitalAssets = 0
    turnover = 8000000
    businessType = "SME"
} | ConvertTo-Json

try {
    $calcResponse = Invoke-RestMethod -Uri "$baseUrl/tax/calculate" -Method POST -Body $taxPayload -ContentType "application/json"
    Write-Host "Calculation Result:" ($calcResponse.data | ConvertTo-Json -Depth 5)
    Write-Host "Report Id:" $calcResponse.reportId
} catch {
    Write-Host "Error: Tax calculation failed: $_"
}

# 3️⃣ Investment Simulation
Write-Host "`n3. Investment Simulation (5 years, 15% growth)..."
$simPayload = @{
    initialInvestment = 5000000
    revenue = 10000000
    profit = 2000000
    capitalGains = 500000
    digitalAssets = 0
    turnover = 8000000
    businessType = "SME"
    years = 5
    growthRate = 0.15
    inflationRate = 0.15
} | ConvertTo-Json

try {
    $simResponse = Invoke-RestMethod -Uri "$baseUrl/tax/simulate" -Method POST -Body $simPayload -ContentType "application/json"
    Write-Host "Simulation Result:" ($simResponse.data | ConvertTo-Json -Depth 5)
    Write-Host "Report Id:" $simResponse.reportId
} catch {
    Write-Host "Error: Simulation failed: $_"
}

# 4️⃣ AI Tax Explanation
Write-Host "`n4. AI Tax Explanation (Pidgin)..."
$aiPayload = @{
    revenue = 10000000
    profit = 2000000
    capitalGains = 500000
    digitalAssets = 0
    turnover = 8000000
    businessType = "SME"
    language = "pidgin"
} | ConvertTo-Json

try {
    $aiResponse = Invoke-RestMethod -Uri "$baseUrl/explain" -Method POST -Body $aiPayload -ContentType "application/json"
    Write-Host "AI Explanation:" $aiResponse.data.explanation
} catch {
    Write-Host "Error: AI explanation failed (check OpenAI API key): $_"
}

# 5️⃣ USSD Tax Calculation
Write-Host "`n5. USSD Tax Calculation..."
$ussdPayload = @{
    text = "1*50000*20000"
    sessionId = "123"
    phoneNumber = "+2348012345678"
} | ConvertTo-Json

try {
    $ussdResponse = Invoke-RestMethod -Uri "$baseUrl/ussd" -Method POST -Body $ussdPayload -ContentType "application/json" -Headers @{ "Accept" = "text/plain" }
    Write-Host "USSD Response:" $ussdResponse
} catch {
    Write-Host "Error: USSD test failed: $_"
}

Write-Host "`n=== Testing Complete! ===`n"
