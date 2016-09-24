'use strict'

const {app, ipcMain} = require('electron')
const CollectionController = require('./controllers/collection')
const Constants = require('./Constants')
const AdmZip = require('adm-zip')
const fs = require('fs')
const os = require('os')


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
    ipcMain.on(Constants.IPC_CHANNEL_SUBMIT, (event, filename, filePackage) => {
      event.returnValue = this.handleSubmitEvent(filename, filePackage)
    })
  }

  handleSubmitEvent (filename, filePackage) {
    let tempFiles = []
    tempFiles.push(this.copyFileToTempFolder(filePackage.license, 'yyzz'))
    tempFiles.push(this.copyFileToTempFolder(filePackage.tax_license, 'swdjz'))
    tempFiles.push(this.copyFileToTempFolder(filePackage.org_license, 'zzjgz'))
    tempFiles.push(this.copyFileToTempFolder(filePackage.bank_license, 'jsxkz'))
    tempFiles.push(this.copyFileToTempFolder(filePackage.legal_id_front, 'frzjz'))
    tempFiles.push(this.copyFileToTempFolder(filePackage.legal_id_back, 'frzjf'))

    let zip = new AdmZip()
    for (const tempFile of tempFiles) {
      zip.addLocalFile(tempFile)
    }
    zip.writeZip(filename)
    return true
  }

  getFileExtension (filename) {
    return filename.substring(filename.lastIndexOf('.'))
  }

  copyFileToTempFolder (source, type) {
    const filePath = os.tmpdir() + '/' + type + this.getFileExtension(source)
    const fileContent = fs.readFileSync(source)
    fs.writeFileSync(filePath, fileContent)
    return filePath
  }
}

(new SinapayTool()).init()
