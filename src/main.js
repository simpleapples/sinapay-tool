'use strict'

const {app, ipcMain} = require('electron')
const CollectionController = require('./controllers/collection')
const Constants = require('./constants')
const JSZip = require('jszip')
const md5File = require('md5-file')
const fs = require('fs')

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
      this.handleSubmitEvent(filename, filePackage, (hash) => {
        event.sender.send(Constants.IPC_CHANNEL_COMPLETE, hash)
      })
    })
  }

  handleSubmitEvent (filename, filePackage, callback) {
    let zip = new JSZip()
    zip.file('yyzz' + this.getFileExtension(filePackage.license), fs.readFileSync(filePackage.license))
    zip.file('swdjz' + this.getFileExtension(filePackage.tax_license), fs.readFileSync(filePackage.tax_license))
    zip.file('zzjgz' + this.getFileExtension(filePackage.org_license), fs.readFileSync(filePackage.org_license))
    zip.file('jsxkz' + this.getFileExtension(filePackage.bank_license), fs.readFileSync(filePackage.bank_license))
    zip.file('frzjz' + this.getFileExtension(filePackage.legal_id_front), fs.readFileSync(filePackage.legal_id_front))
    zip.file('frzjf' + this.getFileExtension(filePackage.legal_id_back), fs.readFileSync(filePackage.legal_id_back))
    zip.generateNodeStream({type: 'nodebuffer', streamFiles: true}).pipe(fs.createWriteStream(filename)).on('finish', () => {
      fs.readFile(filename, (err, data) => {
        if (!err) {
          const hash = md5File.sync(filename)
          callback(hash)
        }
      })
    })
  }

  getFileExtension (filename) {
    return filename.substring(filename.lastIndexOf('.'))
  }
}

(new SinapayTool()).init()
