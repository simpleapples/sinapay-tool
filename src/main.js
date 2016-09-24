'use strict'

const {app, ipcMain} = require('electron')
const CollectionController = require('./controllers/collection')
const Constants = require('./Constants')

class SinapayTool {
  constructor () {
    this.collectionController = null
  }

  init () {
    this.initApp()
    this.initIPC()
  }

  initApp () {
    app.on('ready', () => {
      this.collectionController = new CollectionController()
      this.collectionController.showView()
    })
    app.on('activate', () => {
      if (!this.collectionController) {
        this.collectionController = new CollectionController()
      }
      this.collectionController.showView()
    })
  }

  initIPC () {
    ipcMain.on(Constants.IPC_CHANNEL_SUBMIT, (event, arg) => {
      event.returnValue = this.handleSubmitEvent(arg)
    })
  }

  handleSubmitEvent (filePackage) {
    return true
  }
}

(new SinapayTool()).init()
