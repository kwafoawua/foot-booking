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
            'traceur' : 'npm:traceur/bin',
            'angular-calendar' : 'npm:angular-calendar/dist/umd/angular-calendar.js',
            'calendar-utils': 'npm:calendar-utils/dist/umd/calendar-utils.js',
            'angular-resizable-element': 'npm:angular-resizable-element/dist/umd/angular-resizable-element.js',
            'angular-draggable-droppable': 'npm:angular-draggable-droppable/dist/umd/angular-draggable-droppable.js',
            'date-fns': 'npm:date-fns',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            '@swimlane/ngx-charts':'npm:@swimlane/ngx-charts/release/index.js',
            'd3-array': 'npm:d3-array/build/d3-array.js',
            'd3-brush': 'npm:d3-brush/build/d3-brush.js',
            'd3-shape': 'npm:d3-shape/build/d3-shape.js',
            'd3-selection': 'npm:d3-selection/build/d3-selection.js',
            'd3-color': 'npm:d3-color/build/d3-color.js',
            'd3-drag': 'npm:d3-drag/build/d3-drag.js',
            'd3-transition': 'npm:d3-transition/build/d3-transition.js',
            'd3-format': 'npm:d3-format/build/d3-format.js',
            'd3-force': 'npm:d3-force/build/d3-force.js',
            'd3-dispatch': 'npm:d3-dispatch/build/d3-dispatch.js',
            'd3-path': 'npm:d3-path/build/d3-path.js',
            'd3-ease': 'npm:d3-ease/build/d3-ease.js',
            'd3-timer': 'npm:d3-timer/build/d3-timer.js',
            'd3-quadtree': 'npm:d3-quadtree/build/d3-quadtree.js',
            'd3-interpolate': 'npm:d3-interpolate/build/d3-interpolate.js',
            'd3-scale': 'npm:d3-scale/build/d3-scale.js',
            'd3-time': 'npm:d3-time/build/d3-time.js',
            'd3-collection': 'npm:d3-collection/build/d3-collection.js',
            'd3-time-format': 'npm:d3-time-format/build/d3-time-format.js',
            'd3-hierarchy': 'npm:d3-hierarchy/build/d3-hierarchy.js'



        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            'traceur': {
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
            'ng2-validation': {
                defaultExtension: 'js'
            },
            'ng2-date-picker': {
                defaultExtension: 'js',
                main: './index.js'
            },
            'date-fns': {
                main: './index.js',
                defaultExtension: 'js'
            },
            '@swimlane/ngx-charts': {
                defaultExtension: 'js'
            },
            'd3-array': {
                defaultExtension: 'js'
            },
            'd3-brush': {
                defaultExtension: 'js'
            },
            'd3-shape': {
                defaultExtension: 'js'
            },
            'd3-selection': {
                defaultExtension: 'js'
            },
            'd3-color': {
                defaultExtension: 'js'
            },
            'd3-drag': {
                defaultExtension: 'js'
            },
            'd3-transition': {
                defaultExtension: 'js'
            },
            'd3-format': {
                defaultExtension: 'js'
            },
            'd3-force': {
                defaultExtension: 'js'
            },
            'd3-dispatch': {
                defaultExtension: 'js'
            },
            'd3-path': {
                defaultExtension: 'js'
            },
            'd3-ease': {
                defaultExtension: 'js'
            },
            'd3-timer': {
                defaultExtension: 'js'
            },
            'd3-quadtree': {
                defaultExtension: 'js'
            },
            'd3-interpolate': {
                defaultExtension: 'js'
            },
            'd3-scale': {
                defaultExtension: 'js'
            },
            'd3-time': {
                defaultExtension: 'js'
            },
            'd3-collection': {
                defaultExtension: 'js'
            },
            'd3-time-format': {
                defaultExtension: 'js'
            },
            'd3-hierarchy': {
                defaultExtension: 'js'
            }

            // '@ng-bootstrap/ng-bootstrap': {
            //     main: './index.js',
            //     defaultExtension: 'js'
            // }

        }
    });
})(this);