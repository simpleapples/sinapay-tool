'use strict'

const {BrowserWindow} = require('electron')
const path = require('path')
const CSSInjector = require('../injection/css')
const Constants = require('../constants')

class CollectionController {
  constructor () {
    this.createWindow()
  }

  createWindow () {
    this.collectionWindow = new BrowserWindow({
      title: '企业审核资料生成',
      width: Constants.WINDOW_SIZE.width,
      height: Constants.WINDOW_SIZE.height,
      resizable: false,
      center: false,
      show: false,
      frame: true,
      autoHideMenuBar: true,
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: false,
        webSecurity: true,
        preload: path.join(__dirname, '../injection/collection.js')
      }
    })

    this.collectionWindow.webContents.on('dom-ready', () => {
      this.collectionWindow.webContents.insertCSS(CSSInjector.commonCSS)
      if (process.platform === 'darwin') {
        this.collectionWindow.webContents.insertCSS(CSSInjector.macOSCSS)
      }
      if (Constants.DEBUG) {
        this.collectionWindow.webContents.openDevTools()
      }
    })

    this.loadView()
  }

  loadView () {
    this.collectionWindow.loadURL('file://' + path.join(__dirname, '/../views/collection.html'))
  }

  showView () {
    this.collectionWindow.show()
  }
}

module.exports = CollectionController
