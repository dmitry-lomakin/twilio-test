# twilio-test

Experimenting with Twilio API for TrueCare24.

The application's features include:

 - Listing provides in a table. The providers list is loaded from the server where it is created as a random set of data
 - Clicking on the `CALL` button initiates a phone call to the admin phone (which is hardcoded in the app config), once the admin picked up the call is being redirected to the chosen provider, once the provider picked up the phone they are connected with the admin
 - The call progress is correctly reflected in the UI
 
**IMPORTANT NOTE:** *The demo installation uses a trial Twilio account so it cannot make calls to real numbers, only to verified ones.*

The code is written in Vanilla JavaScript ES6. In case of older browsers support is required it can be easily converted into ES5 JavaScript code by Webpack with Babel plugin.

No any JavaScript frameworks have been used. Getting the task done would be much easier with a framework though.

Not much attention to the HTML markup and CSS rules organization was paid - this is not my best skill to I decided to save time on that part this time. 
