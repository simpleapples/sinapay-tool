'use strict'

const {app, ipcMain, dialog} = require('electron')
const CollectionController = require('./controllers/collection')
const Constants = require('./constants')
const FilePackage = require('./models/file_package')
const JSZip = require('jszip')
const md5File = require('md5-file')
const uuid = require('uuid')
const fs = require('fs')

class SinapayTool {
  constructor () {
    this.collectionController = null
    this.filePackage = null
  }

  init () {
    this.initApp()
    this.initIPC()
  }

  initApp () {
    app.on('ready', () => {
      this.collectionController = new CollectionController()
      this.collectionController.showView()
      this.filePackage = new FilePackage()
    })
    app.on('close-main-window', () => {
      app.quit()
    })
  }

  initIPC () {
    ipcMain.on(Constants.IPC_CHANNEL_OPEN_FILE, (event, key) => {
      const defaultPath = app.getPath('desktop') + '/' + uuid.v4()
      const filters = [{name: '图片文件', extensions: ['jpg', 'jpeg', 'png', 'gif']}]
      const dialogOptions = {'title': '选择图片文件',
                             'defaultPath': defaultPath,
                             'filters': filters}
      dialog.showOpenDialog(dialogOptions, (filename) => {
        if (filename) {
          this.filePackage.setValueForKey(key, filename[0])
          event.sender.send(Constants.IPC_CHANNEL_OPEN_FILE_COMPLETE, filename)
        } else {
          event.sender.send(Constants.IPC_CHANNEL_OPEN_FILE_COMPLETE, null)
        }
      })
    })
    ipcMain.on(Constants.IPC_CHANNEL_SUBMIT, (event) => {
      if (this.filePackage.isComplete()) {
        const defaultPath = app.getPath('desktop') + '/' + uuid.v4().replace('-', '').substr(0, 8)
        const filters = [{name: '压缩文件', extensions: ['zip']}]
        const dialogOptions = {'title': '保存压缩文件',
                              'defaultPath': defaultPath,
                              'filters': filters}
        dialog.showSaveDialog(dialogOptions, (filename) => {
          if (filename) {
            this.saveToFile(filename, (hash) => {
              dialog.showMessageBox({'title': '压缩完成', 'type': 'info', 'message': '压缩完成，压缩包MD5值为：' + hash, 'buttons': []})
              event.sender.send(Constants.IPC_CHANNEL_SUBMIT_COMPLETE, hash)
            })
          } else {
            event.sender.send(Constants.IPC_CHANNEL_SUBMIT_COMPLETE)
          }
        })
      } else {
        dialog.showMessageBox({'title': '补充企业资料', 'type': 'info', 'message': '请将所有企业资料补充完整', 'buttons': []})
        event.sender.send(Constants.IPC_CHANNEL_SUBMIT_COMPLETE)
      }
    })
  }

  saveToFile (filename, callback) {
    let zip = new JSZip()
    zip.file('yyzz' + this.getFileExtension(this.filePackage.license), fs.readFileSync(this.filePackage.license))
    zip.file('swdjz' + this.getFileExtension(this.filePackage.tax_license), fs.readFileSync(this.filePackage.tax_license))
    zip.file('zzjgz' + this.getFileExtension(this.filePackage.org_license), fs.readFileSync(this.filePackage.org_license))
    zip.file('jsxkz' + this.getFileExtension(this.filePackage.bank_license), fs.readFileSync(this.filePackage.bank_license))
    zip.file('frzjz' + this.getFileExtension(this.filePackage.legal_id_front), fs.readFileSync(this.filePackage.legal_id_front))
    zip.file('frzjf' + this.getFileExtension(this.filePackage.legal_id_back), fs.readFileSync(this.filePackage.legal_id_back))
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
