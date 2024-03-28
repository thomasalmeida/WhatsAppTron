import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  sendTitleChange: (title) => ipcRenderer.send('update-badge', title)
});

document.addEventListener('DOMContentLoaded', () => {
  const originalTitle = document.title;
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      if (originalTitle !== document.title) {
        window.electron.sendTitleChange(document.title);
      }
    });
  });

  observer.observe(document.querySelector('title'), { childList: true });
});
