// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: "http://localhost:8000",
  // api_url: "https://api.testing.opensensemap.org",
  sensor_wiki_url: "http://localhost:3001",
  mapbox_token: "pk.eyJ1IjoibWFmZWhpemEiLCJhIjoiY2p1eW1mc2pjMGg5bTRlbzR4dmxlN2UwNyJ9.jpQg98EKkeJUuPHmU4_Xow",
  locationiq_token: "23e12b10d8c3aad04e8e"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
