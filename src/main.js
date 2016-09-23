'use strict';

const {app, ipcMain} = require('electron');
const CollectionController = require('./controllers/collection')

class SinapayTool {
    constructor() {
        this.collectionController = null;
    }

    init() {
        this.initApp();
    }

    initApp() {
        app.on('ready', () => {
            this.collectionController = new CollectionController();
            this.collectionController.showView()
        });
        app.on('activate', () => {
            if (!this.collectionController) {
                this.collectionController = new CollectionController();
            }
            this.collectionController.showView();
        });
    }
}

(new SinapayTool()).init();