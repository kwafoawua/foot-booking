/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',

            // other libraries
            'rxjs': 'npm:rxjs',
            'ngx-chips': 'npm:ngx-chips/dist/ngx-chips.bundle.js',
            'ng2-material-dropdown' : 'npm:ng2-material-dropdown/dist/ng2-dropdown.bundle.js',
            'angular2-image-upload': 'node_modules/angular2-image-upload',
            'ng2-validation': 'npm:ng2-validation/bundles/ng2-validation.umd.js',
            'libphonenumber-js' : 'npm:libphonenumber-js/bundle/libphonenumber-js.min.js',
            '@agm/core': 'node_modules/@agm/core/core.umd.js',
            'ng2-date-picker':'npm:ng2-date-picker',
            'moment' : 'npm:moment/moment.js',
            'traceur' : 'npm:traceur/bin'



        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            'traceur':{
                main: 'traceur.js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-image-upload': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ngx-chips': {
                defaultExtension: 'js'
            },
            'ng2-validation' : {
                defaultExtension: 'js'
            },
            'ng2-date-picker':{
                defaultExtension: 'js',
                main: './index.js'
            }
        }
    });
})(this);
