Add-Type -AssemblyName System.Drawing

$outDir = Join-Path $PSScriptRoot "..\public\tech"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$w = 600
$h = 750

$techList = @(
    @{ id="react"; name="React.js"; cat="Frontend Architecture"; col=[System.Drawing.Color]::FromArgb(97, 218, 251) },
    @{ id="nextjs"; name="Next.js"; cat="Full Stack Framework"; col=[System.Drawing.Color]::FromArgb(255, 255, 255) },
    @{ id="typescript"; name="TypeScript"; cat="Type-Safe Systems"; col=[System.Drawing.Color]::FromArgb(49, 120, 198) },
    @{ id="nodejs"; name="Node.js"; cat="Backend Runtime"; col=[System.Drawing.Color]::FromArgb(34, 197, 94) },
    @{ id="python"; name="Python"; cat="AI & Data Engineering"; col=[System.Drawing.Color]::FromArgb(56, 189, 248) },
    @{ id="docker"; name="Docker"; cat="Containers & DevOps"; col=[System.Drawing.Color]::FromArgb(56, 189, 248) },
    @{ id="mongodb"; name="MongoDB"; cat="NoSQL Document Store"; col=[System.Drawing.Color]::FromArgb(16, 185, 129) },
    @{ id="postgresql"; name="PostgreSQL"; cat="Relational Database"; col=[System.Drawing.Color]::FromArgb(51, 103, 145) },
    @{ id="redis"; name="Redis"; cat="In-Memory Cache & Queue"; col=[System.Drawing.Color]::FromArgb(239, 68, 68) },
    @{ id="tailwind"; name="Tailwind CSS"; cat="Modern Design Systems"; col=[System.Drawing.Color]::FromArgb(56, 189, 248) },
    @{ id="express"; name="Express.js"; cat="RESTful API Services"; col=[System.Drawing.Color]::FromArgb(245, 158, 11) },
    @{ id="github"; name="GitHub & Git"; cat="CI/CD & Version Control"; col=[System.Drawing.Color]::FromArgb(241, 245, 249) }
)

foreach ($t in $techList) {
    $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Deep dark background #0c1017
    $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 12, 16, 23))
    $g.FillRectangle($bgBrush, 0, 0, $w, $h)

    # Ambient radial glow using tech brand color
    $pathGlow = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pathGlow.AddEllipse(50, 70, 500, 500)
    $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush $pathGlow
    $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(60, $t.col.R, $t.col.G, $t.col.B)
    $glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 12, 16, 23))
    $g.FillPath($glowBrush, $pathGlow)

    # Outer border
    $penBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(50, $t.col.R, $t.col.G, $t.col.B), 2)
    $g.DrawRectangle($penBorder, 16, 16, $w - 32, $h - 32)

    # Corner tech ticks
    $penCorner = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, $t.col.R, $t.col.G, $t.col.B), 3)
    $cLen = 32
    $g.DrawLine($penCorner, 16, 16, 16 + $cLen, 16)
    $g.DrawLine($penCorner, 16, 16, 16, 16 + $cLen)
    $g.DrawLine($penCorner, $w - 16, 16, $w - 16 - $cLen, 16)
    $g.DrawLine($penCorner, $w - 16, 16, $w - 16, 16 + $cLen)
    $g.DrawLine($penCorner, 16, $h - 16, 16 + $cLen, $h - 16)
    $g.DrawLine($penCorner, 16, $h - 16, 16, $h - 16 - $cLen)
    $g.DrawLine($penCorner, $w - 16, $h - 16, $w - 16 - $cLen, $h - 16)
    $g.DrawLine($penCorner, $w - 16, $h - 16, $w - 16, $h - 16 - $cLen)

    # Logo Rendering Area (Center: 300, 270)
    $cx = 300
    $cy = 270

    if ($t.id -eq "react") {
        # Official React Atom: 3 Orbits + Nucleus
        $penOrbit = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 97, 218, 251), 10)
        for ($angle = 0; $angle -lt 180; $angle += 60) {
            $state = $g.Save()
            $g.TranslateTransform($cx, $cy)
            $g.RotateTransform($angle)
            $g.DrawEllipse($penOrbit, -112, -42, 224, 84)
            $g.Restore($state)
        }
        $brushNuc = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 97, 218, 251))
        $g.FillEllipse($brushNuc, $cx - 20, $cy - 20, 40, 40)
    }
    elseif ($t.id -eq "nextjs") {
        # Next.js Badge with 'N'
        $brushNext = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0, 0, 0))
        $penNext = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 60, 68, 80), 4)
        $g.FillEllipse($brushNext, $cx - 95, $cy - 95, 190, 190)
        $g.DrawEllipse($penNext, $cx - 95, $cy - 95, 190, 190)
        
        $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        # Left vertical bar
        $g.FillRectangle($whiteBrush, $cx - 52, $cy - 60, 22, 120)
        # Right vertical bar
        $g.FillRectangle($whiteBrush, $cx + 30, $cy - 60, 22, 120)
        # Diagonal slash
        $pDiag = New-Object System.Drawing.Drawing2D.GraphicsPath
        $pDiag.AddPolygon(@(
            (New-Object System.Drawing.PointF ($cx - 52), ($cy - 60)),
            (New-Object System.Drawing.PointF ($cx - 26), ($cy - 60)),
            (New-Object System.Drawing.PointF ($cx + 42), ($cy + 60)),
            (New-Object System.Drawing.PointF ($cx + 16), ($cy + 60))
        ))
        $diagBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush -ArgumentList (New-Object System.Drawing.PointF $cx, ($cy - 60)), (New-Object System.Drawing.PointF $cx, ($cy + 60)), ([System.Drawing.Color]::White), ([System.Drawing.Color]::FromArgb(40, 255, 255, 255))
        $g.FillPath($diagBrush, $pDiag)
    }
    elseif ($t.id -eq "typescript") {
        # TypeScript Rounded Square Badge + "TS"
        $tsBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 49, 120, 198))
        $tsPath = New-Object System.Drawing.Drawing2D.GraphicsPath
        $r = 24
        $rx = $cx - 95
        $ry = $cy - 95
        $rw = 190
        $rh = 190
        $tsPath.AddArc($rx, $ry, $r*2, $r*2, 180, 90)
        $tsPath.AddArc($rx + $rw - $r*2, $ry, $r*2, $r*2, 270, 90)
        $tsPath.AddArc($rx + $rw - $r*2, $ry + $rh - $r*2, $r*2, $r*2, 0, 90)
        $tsPath.AddArc($rx, $ry + $rh - $r*2, $r*2, $r*2, 90, 90)
        $tsPath.CloseFigure()
        $g.FillPath($tsBrush, $tsPath)

        $fontTs = New-Object System.Drawing.Font "Segoe UI", 84, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
        $fmtTs = New-Object System.Drawing.StringFormat
        $fmtTs.Alignment = [System.Drawing.StringAlignment]::Center
        $fmtTs.LineAlignment = [System.Drawing.StringAlignment]::Center
        $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        $g.DrawString("TS", $fontTs, $whiteBrush, (New-Object System.Drawing.RectangleF ($cx - 95), ($cy - 85), 190, 190), $fmtTs)
    }
    elseif ($t.id -eq "nodejs") {
        # Node.js Hexagon
        $nodeBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 95, 160, 78))
        $hexPath = New-Object System.Drawing.Drawing2D.GraphicsPath
        $pts = @()
        for ($i = 0; $i -lt 6; $i++) {
            $rad = ($i * 60 - 30) * [Math]::PI / 180
            $pts += New-Object System.Drawing.PointF ($cx + 90 * [Math]::Cos($rad)), ($cy + 90 * [Math]::Sin($rad))
        }
        $hexPath.AddPolygon($pts)
        $g.FillPath($nodeBrush, $hexPath)

        # Inner dark cutout
        $innerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 14, 18, 25))
        $innerHex = New-Object System.Drawing.Drawing2D.GraphicsPath
        $ptsInner = @()
        for ($i = 0; $i -lt 6; $i++) {
            $rad = ($i * 60 - 30) * [Math]::PI / 180
            $ptsInner += New-Object System.Drawing.PointF ($cx + 62 * [Math]::Cos($rad)), ($cy + 62 * [Math]::Sin($rad))
        }
        $innerHex.AddPolygon($ptsInner)
        $g.FillPath($innerBrush, $innerHex)

        # Central Node core
        $coreBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 95, 160, 78))
        $g.FillRectangle($coreBrush, $cx - 22, $cy - 22, 44, 44)
    }
    elseif ($t.id -eq "python") {
        # Python Dual Snake Badge
        $blueBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 56, 189, 248))
        $yellowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 250, 204, 21))
        
        # Top Snake (Blue)
        $g.FillPie($blueBrush, $cx - 70, $cy - 90, 90, 90, 180, 180)
        $g.FillRectangle($blueBrush, $cx - 25, $cy - 65, 50, 45)
        $g.FillRectangle($blueBrush, $cx - 65, $cy - 45, 50, 35)
        $g.FillEllipse($yellowBrush, $cx - 45, $cy - 72, 14, 14)

        # Bottom Snake (Yellow)
        $g.FillPie($yellowBrush, $cx - 20, $cy, 90, 90, 0, 180)
        $g.FillRectangle($yellowBrush, $cx - 25, $cy + 20, 50, 45)
        $g.FillRectangle($yellowBrush, $cx + 15, $cy + 10, 50, 35)
        $g.FillEllipse($blueBrush, $cx + 32, $cy + 58, 14, 14)
    }
    elseif ($t.id -eq "docker") {
        # Docker Whale + Container Matrix
        $whaleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 36, 150, 237))
        # Containers
        $boxW = 20
        $boxH = 16
        $gap = 4
        $startX = $cx - 65
        $startY = $cy - 55
        for ($row = 0; $row -lt 3; $row++) {
            $cols = if ($row -eq 0) { 3 } elseif ($row -eq 1) { 5 } else { 5 }
            for ($col = 0; $col -lt $cols; $col++) {
                $bx = $startX + $col * ($boxW + $gap)
                $by = $startY + $row * ($boxH + $gap)
                $g.FillRectangle($whaleBrush, $bx, $by, $boxW, $boxH)
            }
        }
        # Whale body
        $whalePath = New-Object System.Drawing.Drawing2D.GraphicsPath
        $whalePath.AddArc($cx - 90, $cy + 10, 160, 65, 0, 180)
        $whalePath.AddLine($cx + 70, $cy + 42, $cx + 95, $cy + 15)
        $whalePath.AddLine($cx + 95, $cy + 15, $cx + 85, $cy + 35)
        $whalePath.AddLine($cx + 85, $cy + 35, $cx + 70, $cy + 42)
        $whalePath.CloseFigure()
        $g.FillPath($whaleBrush, $whalePath)
        # Eye
        $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        $g.FillEllipse($whiteBrush, $cx - 72, $cy + 22, 10, 10)
    }
    elseif ($t.id -eq "mongodb") {
        # MongoDB Emerald Leaf
        $leafPathLeft = New-Object System.Drawing.Drawing2D.GraphicsPath
        $leafPathLeft.AddBezier((New-Object System.Drawing.PointF $cx, ($cy - 95)), (New-Object System.Drawing.PointF ($cx - 20), ($cy - 60)), (New-Object System.Drawing.PointF ($cx - 85), ($cy + 20)), (New-Object System.Drawing.PointF $cx, ($cy + 95)))
        $leafBrushLeft = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 17, 97, 73))
        $g.FillPath($leafBrushLeft, $leafPathLeft)

        $leafPathRight = New-Object System.Drawing.Drawing2D.GraphicsPath
        $leafPathRight.AddBezier((New-Object System.Drawing.PointF $cx, ($cy - 95)), (New-Object System.Drawing.PointF ($cx + 20), ($cy - 60)), (New-Object System.Drawing.PointF ($cx + 85), ($cy + 20)), (New-Object System.Drawing.PointF $cx, ($cy + 95)))
        $leafBrushRight = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0, 237, 100))
        $g.FillPath($leafBrushRight, $leafPathRight)

        # Center spine
        $penSpine = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 3)
        $g.DrawLine($penSpine, $cx, ($cy - 95), $cx, ($cy + 95))
    }
    elseif ($t.id -eq "postgresql") {
        # PostgreSQL Elephant Badge
        $pgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 51, 103, 145))
        $g.FillEllipse($pgBrush, $cx - 75, $cy - 75, 150, 150)

        # Ear
        $pgDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 41, 85, 122))
        $g.FillEllipse($pgDark, $cx - 85, $cy - 45, 75, 95)

        # Trunk
        $penTrunk = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 51, 103, 145), 26)
        $penTrunk.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $penTrunk.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        $g.DrawArc($penTrunk, $cx + 20, $cy - 10, 65, 85, 270, 180)

        # Eye & Tusk
        $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        $g.FillEllipse($whiteBrush, $cx + 10, $cy - 25, 16, 16)
        $blackBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 12, 16, 23))
        $g.FillEllipse($blackBrush, $cx + 14, $cy - 23, 8, 8)
        $g.FillPie($whiteBrush, $cx + 28, $cy + 25, 30, 30, 45, 90)
    }
    elseif ($t.id -eq "redis") {
        # Redis Stacked Isometric Layers
        for ($layer = 2; $layer -ge 0; $layer--) {
            $ly = $cy + 45 - ($layer * 45)
            $colTop = if ($layer -eq 2) { [System.Drawing.Color]::FromArgb(255, 239, 68, 68) } elseif ($layer -eq 1) { [System.Drawing.Color]::FromArgb(255, 220, 38, 38) } else { [System.Drawing.Color]::FromArgb(255, 185, 28, 28) }
            $colLeft = if ($layer -eq 2) { [System.Drawing.Color]::FromArgb(255, 185, 28, 28) } elseif ($layer -eq 1) { [System.Drawing.Color]::FromArgb(255, 153, 27, 27) } else { [System.Drawing.Color]::FromArgb(255, 127, 29, 29) }
            $colRight = if ($layer -eq 2) { [System.Drawing.Color]::FromArgb(255, 248, 113, 113) } elseif ($layer -eq 1) { [System.Drawing.Color]::FromArgb(255, 239, 68, 68) } else { [System.Drawing.Color]::FromArgb(255, 220, 38, 38) }

            # Top Facet
            $pTop = New-Object System.Drawing.Drawing2D.GraphicsPath
            $pTop.AddPolygon(@(
                (New-Object System.Drawing.PointF $cx, ($ly - 32)),
                (New-Object System.Drawing.PointF ($cx + 85), $ly),
                (New-Object System.Drawing.PointF $cx, ($ly + 32)),
                (New-Object System.Drawing.PointF ($cx - 85), $ly)
            ))
            $g.FillPath((New-Object System.Drawing.SolidBrush $colTop), $pTop)

            # Left Facet
            $pLeft = New-Object System.Drawing.Drawing2D.GraphicsPath
            $pLeft.AddPolygon(@(
                (New-Object System.Drawing.PointF ($cx - 85), $ly),
                (New-Object System.Drawing.PointF $cx, ($ly + 32)),
                (New-Object System.Drawing.PointF $cx, ($ly + 52)),
                (New-Object System.Drawing.PointF ($cx - 85), ($ly + 20))
            ))
            $g.FillPath((New-Object System.Drawing.SolidBrush $colLeft), $pLeft)

            # Right Facet
            $pRight = New-Object System.Drawing.Drawing2D.GraphicsPath
            $pRight.AddPolygon(@(
                (New-Object System.Drawing.PointF $cx, ($ly + 32)),
                (New-Object System.Drawing.PointF ($cx + 85), $ly),
                (New-Object System.Drawing.PointF ($cx + 85), ($ly + 20)),
                (New-Object System.Drawing.PointF $cx, ($ly + 52))
            ))
            $g.FillPath((New-Object System.Drawing.SolidBrush $colRight), $pRight)
        }
    }
    elseif ($t.id -eq "tailwind") {
        # Tailwind CSS Dual Wave Crests
        $wavePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 56, 189, 248), 24)
        $wavePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
        $wavePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
        
        # Wave 1
        $g.DrawArc($wavePen, $cx - 85, $cy - 65, 80, 80, 180, 180)
        $g.DrawArc($wavePen, $cx - 5, $cy - 65, 80, 80, 0, 180)
        # Wave 2
        $g.DrawArc($wavePen, $cx - 50, $cy + 5, 80, 80, 180, 180)
        $g.DrawArc($wavePen, $cx + 30, $cy + 5, 60, 60, 0, 180)
    }
    elseif ($t.id -eq "express") {
        # Express.js Badge
        $exBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 24, 24, 27))
        $exPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 245, 158, 11), 3)
        $g.FillRectangle($exBrush, $cx - 85, $cy - 85, 170, 170)
        $g.DrawRectangle($exPen, $cx - 85, $cy - 85, 170, 170)

        $fontEx = New-Object System.Drawing.Font "Segoe UI", 84, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
        $fmtEx = New-Object System.Drawing.StringFormat
        $fmtEx.Alignment = [System.Drawing.StringAlignment]::Center
        $fmtEx.LineAlignment = [System.Drawing.StringAlignment]::Center
        $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        $g.DrawString("ex", $fontEx, $whiteBrush, (New-Object System.Drawing.RectangleF ($cx - 85), ($cy - 92), 170, 170), $fmtEx)
        
        $amberBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 245, 158, 11))
        $g.FillEllipse($amberBrush, $cx + 40, $cy + 22, 16, 16)
    }
    elseif ($t.id -eq "github") {
        # GitHub Octocat Silhouette
        $gitBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 240, 246, 252))
        # Head
        $g.FillEllipse($gitBrush, $cx - 65, $cy - 50, 130, 120)
        # Ears
        $pLeftEar = New-Object System.Drawing.Drawing2D.GraphicsPath
        $pLeftEar.AddPolygon(@(
            (New-Object System.Drawing.PointF ($cx - 55), ($cy - 35)),
            (New-Object System.Drawing.PointF ($cx - 60), ($cy - 75)),
            (New-Object System.Drawing.PointF ($cx - 25), ($cy - 48))
        ))
        $g.FillPath($gitBrush, $pLeftEar)

        $pRightEar = New-Object System.Drawing.Drawing2D.GraphicsPath
        $pRightEar.AddPolygon(@(
            (New-Object System.Drawing.PointF ($cx + 55), ($cy - 35)),
            (New-Object System.Drawing.PointF ($cx + 60), ($cy - 75)),
            (New-Object System.Drawing.PointF ($cx + 25), ($cy - 48))
        ))
        $g.FillPath($gitBrush, $pRightEar)

        # Body & Tail hints
        $g.FillPie($gitBrush, $cx - 45, $cy + 40, 90, 70, 180, 180)
    }

    # Tech Name
    $fontName = New-Object System.Drawing.Font "Segoe UI", 42, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushName = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 241, 245, 249))
    $fmtCenter = New-Object System.Drawing.StringFormat
    $fmtCenter.Alignment = [System.Drawing.StringAlignment]::Center
    $fmtCenter.LineAlignment = [System.Drawing.StringAlignment]::Center
    $nameRect = New-Object System.Drawing.RectangleF 0, 480, $w, 55
    $g.DrawString($t.name, $fontName, $brushName, $nameRect, $fmtCenter)

    # Category Pill
    $pillW = 280
    $pillH = 42
    $pillX = [int](($w - $pillW) / 2)
    $pillY = 555
    $brushPill = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, $t.col.R, $t.col.G, $t.col.B))
    $penPill = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90, $t.col.R, $t.col.G, $t.col.B), 1.5)
    $pillRect = New-Object System.Drawing.Rectangle $pillX, $pillY, $pillW, $pillH
    $g.FillRectangle($brushPill, $pillRect)
    $g.DrawRectangle($penPill, $pillRect)

    $fontCat = New-Object System.Drawing.Font "Segoe UI", 18, "Bold", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushCat = New-Object System.Drawing.SolidBrush $t.col
    $catRect = New-Object System.Drawing.RectangleF $pillX, $pillY, $pillW, $pillH
    $g.DrawString($t.cat.ToUpper(), $fontCat, $brushCat, $catRect, $fmtCenter)

    # Bottom Terminal Accent
    $fontTech = New-Object System.Drawing.Font "Consolas", 15, "Regular", ([System.Drawing.GraphicsUnit]::Pixel)
    $brushTech = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(140, 100, 116, 139))
    $techRect = New-Object System.Drawing.RectangleF 0, 665, $w, 35
    $g.DrawString("// PRODUCTION SYSTEM STACK", $fontTech, $brushTech, $techRect, $fmtCenter)

    $outPath = Join-Path $outDir "$($t.id).png"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Rendered $outPath"
}
