// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  uploadsBaseURL: 'http://localhost:4000/uploads/',
  firebase: {
    apiKey: "AIzaSyCrCw2WgF9K3Utxp5f49DORmetqnR3gmZw",
    authDomain: "footbookingtesis.firebaseapp.com",
    databaseURL: "https://footbookingtesis.firebaseio.com",
    projectId: "footbookingtesis",
    storageBucket: "footbookingtesis.appspot.com",
    messagingSenderId: "354372654294",
    appId: "1:354372654294:web:03aef8d71742ba648da577",
    measurementId: "G-EQ0YKYLY9W"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
