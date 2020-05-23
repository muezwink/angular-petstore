// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /*
  firebase: {
    apiKey: "AIzaSyA7tUXWUQa_yy1GLJgeEH1PlSV1_--xKBY",
    authDomain: "firepetstore-js.firebaseapp.com",
    databaseURL: "https://firepetstore-js.firebaseio.com",
    projectId: "firepetstore-js",
    storageBucket: "",
    messagingSenderId: "201994318544",
    appId: "1:201994318544:web:90468d4e639077511fe4d5",
    measurementId: "G-F9B0PHFQTB"
  }
  */
  // Your web app's Firebase configuration
  firebase : {
    apiKey: "AIzaSyD020qimE59UT81-l1ixwcVC_stwMpuTpg",
    authDomain: "firepetstore-mraz.firebaseapp.com",
    databaseURL: "https://firepetstore-mraz.firebaseio.com",
    projectId: "firepetstore-mraz",
    storageBucket: "firepetstore-mraz.appspot.com",
    messagingSenderId: "163062058088",
    appId: "1:163062058088:web:64ae20e32a42eca584ffdd",
    measurementId: "G-ZE535XKELP"
  }
  // Initialize Firebase
  // firebase.initializeApp(firebase);
  // firebase.analytics();
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
