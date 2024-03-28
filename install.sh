#!/bin/bash

echo "Building WhatsAppTron..."
npm run build

BUILD_DIR="release-builds/WhatsAppTron-linux-x64"
DEST_DIR="/opt/whatsapptron"

echo "Copying build to $DEST_DIR..."
sudo rm -rf "$DEST_DIR"
sudo mv "$BUILD_DIR" "$DEST_DIR"

DESKTOP_FILE_PATH="$HOME/.local/share/applications/whatsapptron.desktop"
DESKTOP_FILE="[Desktop Entry]
Type=Application
Name=WhatsAppTron
Exec=$DEST_DIR/WhatsAppTron
Icon=$DEST_DIR/resources/app/assets/app-icon.png
Terminal=false
Categories=Internet;InstantMessaging;"

echo "Creating .desktop file at $DESKTOP_FILE_PATH..."
mkdir -p "$HOME/.local/share/applications"
echo "$DESKTOP_FILE" > "$DESKTOP_FILE_PATH"

echo "Installation complete."
