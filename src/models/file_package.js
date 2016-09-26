'use strict'

class FilePackage {
  constructor () {
    this.license = '/Users/Zzy/Desktop/test.jpg'
    this.tax_license = '/Users/Zzy/Desktop/test.jpg'
    this.org_license = '/Users/Zzy/Desktop/test.jpg'
    this.bank_license = '/Users/Zzy/Desktop/test.jpg'
    this.legal_id_front = '/Users/Zzy/Desktop/test.jpg'
    this.legal_id_back = '/Users/Zzy/Desktop/test.jpg'
  }


  setValueForKey (key, value) {
    const properties = ['license', 'tax_license', 'org_license', 'bank_license', 'legal_id_front', 'legal_id_back']
    if (properties.indexOf(key) > -1) {
      this[key] = value
    }
  }
}

module.exports = FilePackage
