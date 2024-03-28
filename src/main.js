import { app, BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let win;
let tray = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.webContents.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36");
  win.loadURL('https://web.whatsapp.com');

  win.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      win.hide();
    }
  });
}

function updateTrayIcon() {
  win.webContents.executeJavaScript("document.title")
    .then((title) => {
      const unreadCount = title.match(/\(([0-9]+)\)/);
      if (unreadCount) {
        tray.setImage(path.join(__dirname, '../assets/unread-icon.png'));
      } else {
        tray.setImage(path.join(__dirname, '../assets/app-icon.png'));
      }
    });
}

app.whenReady().then(() => {
  createWindow();
  tray = new Tray(path.join(__dirname, '../assets/app-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => win.show() },
    { label: 'Close', click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip('WhatsAppTron');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => win.show());

  setInterval(updateTrayIcon, 1000);
});
