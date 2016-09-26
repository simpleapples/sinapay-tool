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

  const dropAreas = document.getElementsByClassName('drop-area')
  for (const dropArea of dropAreas) {
    dropArea.addEventListener('dragover', function () {
      this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      return false
    })
    dropArea.addEventListener('dragend', function () {
      this.style.backgroundColor = '#fff'
      return false
    })
    dropArea.addEventListener('dragleave', function () {
      this.style.backgroundColor = '#fff'
      return false
    })
    dropArea.addEventListener('drop', function (event) {
      const key = this.getAttribute('data-key')
      for (const file of event.dataTransfer.files) {
        filePackage.setValueForKey(key, file.path)
      }
      this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      this.getElementsByTagName('p')[1].innerHTML = '已拖入'
      return false
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
