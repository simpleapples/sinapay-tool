'use strict';

class CSSInjector {
}

CSSInjector.commonCSS = `
    h1 {
        font-size: 18px;
        text-align: center;
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
`;

module.exports = CSSInjector;