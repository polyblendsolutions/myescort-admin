// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'Ogmedia',
  domain: 'ogmedia.dk',

  // apiBaseLink: 'http://localhost:4401',
  // ftpBaseLink: 'http://localhost:4401',

  apiBaseLink: 'https://api.ogmedia.dk',
  ftpBaseLink: 'https://api.ogmedia.dk',

  appBaseUrl: '/',
  userBaseUrl: '/',
  userProfileUrl: '/my-profile',
  userLoginUrl: '/login',
  adminLoginUrl: 'login',
  adminBaseUrl: '/',
  storageSecret: 'SOFT_2021_IT_1998',
  adminTokenSecret: 'SOFT_ADMIN_1995_&&_SOJOL_dEv',
  userTokenSecret: 'SOFT_ADMIN_1996_&&_SOBUR_dEv',
  apiTokenSecret: 'SOFT_API_1998_&&_SAZIB_dEv',
  VERSION: 1
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
