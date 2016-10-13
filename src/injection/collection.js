'use strict'

const {ipcRenderer} = require('electron')
const {dialog} = require('electron').remote
const Constants = require('../constants')
const FilePackage = require('../models/file_package')

document.addEventListener('DOMContentLoaded', () => {
  let filePackage = new FilePackage()
  document.ondragover = (event) => {
    event.preventDefault()
    return false
  }
  document.ondrop = (event) => {
    event.preventDefault()
    return false
  }

  const uploadAreas = document.getElementsByClassName('upload-area')
  for (const uploadArea of uploadAreas) {
    uploadArea.addEventListener('click', function () {
      this.setAttribute('disabled', 'disabled')
      const key = this.getAttribute('data-key')
      dialog.showOpenDialog((filename) => {
        filePackage.setValueForKey(key, filename[0])
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        this.getElementsByTagName('p')[1].innerHTML = '已上传'
      })
    })
  }

  const submitBtn = document.getElementById('submit-btn')
  submitBtn.addEventListener('click', function () {
    this.setAttribute('disabled', 'disabled')
    ipcRenderer.once(Constants.IPC_CHANNEL_COMPLETE, (event, hash) => {
      this.removeAttribute('disabled')
      dialog.showMessageBox({'title': '压缩成功', 'type': 'info', 'message': 'MD5: ' + hash, 'buttons': []})
    })
    dialog.showSaveDialog({'title': 'package.zip'}, (filename) => {
      ipcRenderer.send(Constants.IPC_CHANNEL_SUBMIT, filename, filePackage)
    })
  })
})
