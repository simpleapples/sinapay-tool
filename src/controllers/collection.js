'use strict';

const {BrowserWindow} = require('electron');
const path = require('path');

class CollectionController {
    constructor() {
        this.createWindow();
    }

    createWindow() {
        this.collectionWindow = new BrowserWindow({
            title: '企业审核资料生成',
            resizable: true,
            center: true,
            show: false,
            frame: true,
            autoHideMenuBar: true,
            titleBarStyle: 'hidden-inset',
            webPreferences: {
                javascript: true,
                plugins: true,
                nodeIntegration: false,
                webSecurity: true
            }
        });

        this.loadView();
    }

    loadView() {
        this.collectionWindow.loadURL('file://' + path.join(__dirname, '/../views/collection.html'));
    }

    showView() {
        this.collectionWindow.show();
    }
}

module.exports = CollectionController