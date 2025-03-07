const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    readHis: () => ipcRenderer.invoke('read-his'),
    addMonth: (year, month) => ipcRenderer.invoke('add-month', year, month),
    addHis: (newHis) => ipcRenderer.invoke('add-his', newHis)
});