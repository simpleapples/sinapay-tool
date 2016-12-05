'use strict'

class CSSInjector {
}

CSSInjector.commonCSS = `
  body {
      font-family: "Microsoft Yahei", "Helvetica Neue";
  }
  h1 {
    font-size: 24px;
    text-align: center;
  }
  body, p, button {
    margin: 0;
    padding: 0;
  }
  button {
    font-family: inherit;
  }
  .container {
    margin-top: 30px;
  }
  .col-md-4 {
    float: left;
    width: 33.33%;
    position: relative;
    min-height: 1px;
    padding: auto 15px;
  }
  .upload-area {
    border: 3px dashed #d3d3d3;
    margin: 10px;
    padding: 64px 10px;
    text-align: center;
    vertical-align: middle;
    color: #d3d3d3;
    cursor: pointer;
  }
  .line-lg {
    font-size: 24px;
    line-height: 36px;
  }
  .line-sm {
    font-size: 14px;
    line-height: 36px;
  }
  .area-pd-lg {
    padding: 64px 10px;
  }
  .area-pd-sm {
    padding: 46px 10px;
  }
  .btn {
    display: inline-block;
    width: 100%;
    height: 50px;
    font-size: 24px;
    border: none;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    background-color: #5bc0de;
    margin-top: 10px;
    line-height: 50px;
    cursor: pointer;
  }
`

CSSInjector.macOSCSS = `
  .container {
    margin-top: 64px;
  }
`

module.exports = CSSInjector
