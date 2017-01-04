var otFb = angular.module('otFb', []);

otFb.directive('otFbSelector', function ($http) {
    return {
        link: function (scope, element, attrs) {
            scope.searchFacebookPages = function (query) {
                if (!query || query === "ot_page_selected") {
                    return;
                }

                if (!scope.fbAccessToken) {
                    console.error("otFbSelector: FB access token not provided.")
                }

                var payload = {
                    type: "page",
                    fields: "id,name,picture",
                    version: "v2.7",
                    q: query,
                    access_token: scope.fbAccessToken
                }
                scope.resultsLoading = true;
                return $http.get('https://graph.facebook.com/search', {params: payload})
                        .then(function (response) {
                            if (response && response.data && response.data.data) {
                                var pages = response.data.data;
                                for (var i = 0; i < pages.length; i++) {
                                    var item = pages[i];
                                    if (item.picture && item.picture.data && item.picture.data.url) {
                                        item.image = item.picture.data.url;
                                    }
                                }

                                scope.resultsLoading = false;
                                scope.facebook_pages_search_results = pages;
                            }
                        });
            };

            scope.selectFacebookPage = function (item) {
                if (item) {
                    scope.fbPage = item;
                }
            }

            scope.$watch("facebook_page_query", function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    scope.searchFacebookPages(newValue);
                }

            });
        },
        scope: {
            fbPage: "=",
            fbAccessToken: "@"
        },
        template: '<div>' +
                '    <div ng-show="facebook_page_query != \'ot_page_selected\' && !init">' +
                '        <div class="ot-form-field-wrapper clearfix hide-field-description">' +
                '            <label class="field-label">Facebook page</label>' +
                '            <div class="ot-form-field-inner-wrapper"><input type="text" ng-model="facebook_page_query" ng-model-options="{updateOn: \'default blur submit\', debounce: {\'default\': 1000, \'blur\': 0}, allowInvalid: \'true\'}" class="form-control"/></div>' +
                '            <small class="field-description">Search for your page name, then select from one of the results below</small>' +
                '        </div>' +
                '        <div ng-show="resultsLoading" class="loading"><div class="loadersmall" style="margin:0 auto;"></div></div>' +
                '        <div ng-hide="resultsLoading" ng-class="{\'ot-fb-border\':facebook_pages_search_results.length > 0}" class="ot-facebook-pages-list">' +
                '            <div ng-repeat="item in facebook_pages_search_results" class="row">' +
                '                <div facebook-id="{{item.id}}" class="item feature"><a ng-click="$parent.facebook_page_query = \'ot_page_selected\'; selectFacebookPage(item)"><span class="feature__image item__image"><img ng-src="{{item.image}}" class="item__thumb"/></span><span class="feature__name item__title">{{item.name}}</span></a></div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '    <div ng-show="facebook_page_query == \'ot_page_selected\' || init">Selected page: {{ fbPage.name}}<span class="edit"><a ng-click="facebook_page_query = \'\';init = false;" style="cursor:pointer;"><small> Change</small></a></span></div>' +
                '</div>'
    };
});

