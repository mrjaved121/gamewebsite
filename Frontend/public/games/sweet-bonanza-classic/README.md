# Sweet Bonanza Classic - Asset Organization Guide

## Folder Structure

Located at: `Frontend/public/games/sweet-bonanza-classic/`

```
sweet-bonanza-classic/
├── symbols/              # Game symbols (8 total)
├── ui/                  # UI Elements  
├── backgrounds/          # Game backgrounds
├── sounds/              # Audio files (MP3)
└── fonts/               # Custom fonts
```

## Asset Specifications

### Symbols (`symbols/`)
- **Format**: PNG with transparency
- **Size**: 256x256px recommended
- **Reference**: See video frames 5-10s

### Backgrounds (`backgrounds/`)
- **main_game_bg.jpg**: 1920x1080px candy-land landscape
- **Style**: Bright pink clouds, blue sky, candy decorations

### UI Elements (`ui/`)
- **logo.png**: Sweet Bonanza logo (800x200px)
- **spin_button.png**: Circular button (128x128px)

### Sounds (`sounds/`)
- Already copied from Sweet Bonanza assets
- Format: MP3, 128-192kbps

## How to Edit

1. Navigate to `f:\Desktop Backup\Hafs\garbet v2\Frontend\public\games\sweet-bonanza-classic\`
2. Open any file in Photoshop
3. Edit and save
4. Refresh browser (Ctrl+F5) - no code changes needed!

## Color Palette
- Sky Blue: #87CEEB
- Pink: #FFB6D9
- Purple: #9370DB
- Yellow: #FFD700

**Component Path**: `Frontend/src/app/pages/SweetBonanzaClassic/index.tsx`
