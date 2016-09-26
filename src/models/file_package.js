'use strict'

class FilePackage {
  constructor () {
    this.license = ''
    this.tax_license = ''
    this.org_license = ''
    this.bank_license = ''
    this.legal_id_front = ''
    this.legal_id_back = ''
  }


  setValueForKey (key, value) {
    const properties = ['license', 'tax_license', 'org_license', 'bank_license', 'legal_id_front', 'legal_id_back']
    if (properties.indexOf(key) > -1) {
      this[key] = value
    }
  }
}

module.exports = FilePackage
