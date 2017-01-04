# otFbSelector
An angularjs directive for searching and select Facebook pages.

## Getting started:
  - Include `otFbSelector.css`:
```html
<link href="otFbSelector.css" rel="stylesheet">
```
  - Include `otFbSelector.js`:
```html
<script src="otFbSelector.js"></script>
```
  - Inject a `otFb` module into your app:
```javascript
angular.module('yourApp', ['otFb']);
```
## How to use:
```html
<ot-fb-selector fb-page="facebookPage" fb-access-token="%FB_ACCESS_TOKEN%"></ot-fb-selector>
```
Selected page params will be saved into `facebookPage` variable.

## Attributes:
 - `fb-access-token` - Facebook access token (*required*)
 - `fb-page` - Scope variable for saving selected FB page
