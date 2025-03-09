import fs from 'fs';
import { fileURLToPath } from 'url';

const { app, BrowserWindow, ipcMain } = await import("electron");
const path = await import("path");
const isDev = await import("electron-is-dev");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.focus();

  initialize();
}

const userDataPath = path.join(app.getPath('userData'), 'data.json');

function initialize(){
  if(!fs.existsSync(userDataPath)){
    fs.writeFileSync(userDataPath, JSON.stringify([]));
  }
}

function readHis(){
  try{
    const data = fs.readFileSync(userDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error){
    console.error(`${userDataPath}위치의 JSON 파일을 읽던 중 오류가 발생했습니다.`, error);
    return [];
  }
}

function addMonth(year, month){
  const histories = readHis();
  histories.unshift(
    {
      "year" : year,
      "month" : month,
      "history" : []
    }
  );
  fs.writeFileSync(userDataPath, JSON.stringify(histories, null, 2));
  return histories;
}

function addHis(newHis){
  const histories = readHis();
  histories[0].history.unshift(newHis);
  fs.writeFileSync(userDataPath, JSON.stringify(histories, null, 2));
  return histories;
}

ipcMain.handle('read-his', () => readHis());
ipcMain.handle('add-month', (event, year, month) => addMonth(year, month));
ipcMain.handle('add-his', (event, newHis) => addHis(newHis));

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});