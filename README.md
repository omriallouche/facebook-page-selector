# Angular Facebook Page Selector
An Angular.js directive for searching and selecting a Facebook page.

[Demo](https://omriallouche.github.io/facebook-page-selector/)

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
In the example above, the selected page will be saved into `facebookPage` variable.

## Attributes:
 - `fb-access-token` - Facebook access token (*required*)
 - `fb-page` - Scope variable to hold the selected FB page
