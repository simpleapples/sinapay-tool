'use strict'

const {ipcRenderer} = require('electron')
const Constants = require('../constants')

document.addEventListener('DOMContentLoaded', () => {
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
      if (this.hasAttribute('disabled')) {
        return
      }
      this.setAttribute('disabled', 'disabled')
      const key = this.getAttribute('data-key')
      ipcRenderer.on(Constants.IPC_CHANNEL_OPEN_FILE_COMPLETE, (event, filename) => {
        if (filename) {
          this.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
          this.getElementsByTagName('p')[1].innerHTML = '已上传'
        } else {
          this.removeAttribute('disabled')
        }
      })
      setTimeout(() => {
        ipcRenderer.send(Constants.IPC_CHANNEL_OPEN_FILE, key)
      }, 100)
    })
  }

  const submitBtn = document.getElementById('submit-btn')
  submitBtn.addEventListener('click', function () {
    if (this.hasAttribute('disabled')) {
      return
    }
    this.setAttribute('disabled', 'disabled')
    this.innerHTML = '保存中...'

    ipcRenderer.on(Constants.IPC_CHANNEL_SUBMIT_COMPLETE, (event, hash) => {
      this.innerHTML = '生成并保存成压缩文件'
      this.removeAttribute('disabled')
    })

    setTimeout(() => {
      ipcRenderer.send(Constants.IPC_CHANNEL_SUBMIT)
    }, 100)
  })
})
