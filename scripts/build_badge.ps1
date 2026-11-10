Add-Type -AssemblyName System.Drawing

$w = 1024
$h = 1440

$heroPhotoPath = Join-Path $PSScriptRoot "..\public\hero_portrait.jpg"
$frontPath = Join-Path $PSScriptRoot "..\public\card-front.png"
$backPath = Join-Path $PSScriptRoot "..\public\card-back.png"
$bandPath = Join-Path $PSScriptRoot "..\public\band.png"

function Render-Badge([string]$outputPath, [bool]$isBack) {
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Dark background #0c0e14
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 12, 14, 20))
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Sleek dark radial glow from center
    $pathGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pathGlow.AddEllipse(100, 200, 824, 1000)
    $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush $pathGlow
    $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(35, 245, 158, 11)
    $glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 12, 14, 20))
    $g.FillPath($glowBrush, $pathGlow)

    # Outer border
    $penBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70, 245, 158, 11), 3)
    $g.DrawRectangle($penBorder, 24, 24, $w - 48, $h - 48)

    # Corner accents
    $penCorner = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, 245, 158, 11), 5)
    $cornerLen = 60
    # Top-left
    $g.DrawLine($penCorner, 24, 24, 24 + $cornerLen, 24)
    $g.DrawLine($penCorner, 24, 24, 24, 24 + $cornerLen)
    # Top-right
    $g.DrawLine($penCorner, $w - 24, 24, $w - 24 - $cornerLen, 24)
    $g.DrawLine($penCorner, $w - 24, 24, $w - 24, 24 + $cornerLen)
    # Bottom-left
    $g.DrawLine($penCorner, 24, $h - 24, 24 + $cornerLen, $h - 24)
    $g.DrawLine($penCorner, 24, $h - 24, 24, $h - 24 - $cornerLen)
    # Bottom-right
    $g.DrawLine($penCorner, $w - 24, $h - 24, $w - 24 - $cornerLen, $h - 24)
    $g.DrawLine($penCorner, $w - 24, $h - 24, $w - 24, $h - 24 - $cornerLen)

    # Lanyard slot hole at top center
    $slotW = 120
    $slotH = 22
    $slotX = [int](($w - $slotW) / 2)
    $slotY = 44
    $slotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 6, 7, 10))
    $slotPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90, 255, 255, 255), 2)
    $slotRect = New-Object System.Drawing.Rectangle $slotX, $slotY, $slotW, $slotH
    $g.FillRectangle($slotBrush, $slotRect)
    $g.DrawRectangle($slotPen, $slotRect)

    # Portrait Photo
    $photoW = 680
    $photoH = 800
    $photoX = [int](($w - $photoW) / 2)
    $photoY = 130

    if (Test-Path $heroPhotoPath) {
        $srcImg = [System.Drawing.Image]::FromFile($heroPhotoPath)
        $destRect = New-Object System.Drawing.Rectangle $photoX, $photoY, $photoW, $photoH
        
        # Crop user photo to focus on face and upper suit
        $srcW = $srcImg.Width
        $srcH = $srcImg.Height
        
        # Focus crop from upper portion where face is
        $cropH = [int]($srcW * ($photoH / $photoW))
        if ($cropH -gt $srcH) {
            $cropH = $srcH
            $cropW = [int]($srcH * ($photoW / $photoH))
            $cropX = [int](($srcW - $cropW) / 2)
            $cropY = 0
        } else {
            $cropW = $srcW
            $cropX = 0
            # Anchor crop near top (face)
            $cropY = [int]($srcH * 0.05)
            if ($cropY + $cropH -gt $srcH) { $cropY = $srcH - $cropH }
        }

        $srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
        $g.DrawImage($srcImg, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
        $srcImg.Dispose()
    }

    # Sleek photo border
    $penPhoto = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(180, 245, 158, 11), 3)
    $g.DrawRectangle($penPhoto, $photoX, $photoY, $photoW, $photoH)

    # Thin accent line under photo
    $penDiv = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 2)
    $g.DrawLine($penDiv, $photoX + 80, $photoY + $photoH + 50, $photoX + $photoW - 80, $photoY + $photoH + 50)

    # Role: Full Stack Developer
    $fontRole = New-Object System.Drawing.Font "Segoe UI", 44, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushRole = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $formatCenter = New-Object System.Drawing.StringFormat
    $formatCenter.Alignment = [System.Drawing.StringAlignment]::Center
    $formatCenter.LineAlignment = [System.Drawing.StringAlignment]::Center

    $roleRect = New-Object System.Drawing.RectangleF 0, ($photoY + $photoH + 60), $w, 80
    $g.DrawString("Full Stack Developer", $fontRole, $brushRole, $roleRect, $formatCenter)

    # Education: B.Tech CSE '27
    $fontEdu = New-Object System.Drawing.Font "Segoe UI", 36, "Regular", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushEdu = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 203, 213, 225))
    $eduRect = New-Object System.Drawing.RectangleF 0, ($photoY + $photoH + 150), $w, 70
    $g.DrawString("B.Tech CSE '27", $fontEdu, $brushEdu, $eduRect, $formatCenter)

    # Clean bottom status pill: "SOFTWARE ENGINEER"
    $pillW = 280
    $pillH = 46
    $pillX = [int](($w - $pillW) / 2)
    $pillY = $h - 130
    $pillBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 245, 158, 11))
    $pillPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80, 245, 158, 11), 2)
    $pillRect = New-Object System.Drawing.Rectangle $pillX, $pillY, $pillW, $pillH
    $g.FillRectangle($pillBrush, $pillRect)
    $g.DrawRectangle($pillPen, $pillRect)

    $fontStatus = New-Object System.Drawing.Font "Segoe UI", 20, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushStatus = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
    $statusRect = New-Object System.Drawing.RectangleF $pillX, $pillY, $pillW, $pillH
    $g.DrawString("SOFTWARE ENGINEER", $fontStatus, $brushStatus, $statusRect, $formatCenter)

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated: $outputPath"
}

# Generate front and back cards
Render-Badge $frontPath $false
Render-Badge $backPath $true

# Generate strap texture: 128 x 512 dark textured weave
$strapW = 128
$strapH = 512
$strapBmp = New-Object System.Drawing.Bitmap $strapW, $strapH, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$sg = [System.Drawing.Graphics]::FromImage($strapBmp)
$sg.Clear([System.Drawing.Color]::FromArgb(255, 18, 20, 28))

$stitchPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 245, 158, 11), 2)
$sg.DrawLine($stitchPen, 8, 0, 8, $strapH)
$sg.DrawLine($stitchPen, $strapW - 8, 0, $strapW - 8, $strapH)

# Subtle weave pattern
$weavePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(25, 255, 255, 255), 1)
for ($y = 0; $y -lt $strapH; $y += 8) {
    $sg.DrawLine($weavePen, 10, $y, $strapW - 10, $y)
}

$strapBmp.Save($bandPath, [System.Drawing.Imaging.ImageFormat]::Png)
$sg.Dispose()
$strapBmp.Dispose()
Write-Output "Generated strap: $bandPath"
