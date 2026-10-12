# Script de automatización para encadenar el render de Gemini Nivel 3 en Remotion
$logPath = "C:\Users\user\.gemini\antigravity-ide\brain\a0f1f8ad-18c9-46f3-a948-5f31e91616fc\.system_generated\tasks\task-7913.log"

Write-Host "Monitoreando renderizado de Gemini Nivel 2..."
while ($true) {
    Start-Sleep -Seconds 10
    if (Test-Path $logPath) {
        $tail = Get-Content $logPath -Tail 8 -ErrorAction SilentlyContinue
        if ($tail -match "gemini_nivel_2_intermedio.mp4") {
            Write-Host "¡Nivel 2 completado exitosamente! Iniciando render de Nivel 3..."
            break
        }
    }
}

# Ejecutar el render de Gemini Nivel 3
npx remotion render GeminiNivel3Reel "..\videos\gemini_nivel_3_avanzado.mp4" --overwrite --concurrency=4
Write-Host "¡Nivel 3 renderizado y guardado con éxito!"
