/*global require*/

require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-menu/js/paths'
], function (Compiler,Menu) {

    var menuConfig = Menu;
    menuConfig['baseUrl'] = '../../submodules/fenix-ui-menu/js';

    Compiler.resolve([menuConfig],
        {
            placeholders:  {"FENIX_CDN": "//fenixapps.fao.org/repository"},
            config: {

                //Set the config for the i18n
                //module ID
                i18n: {
                    locale: 'en-us'
                },

                // The path where your JavaScripts are located
                baseUrl: './src/js',

                // Specify the paths of vendor libraries
                paths: {
                    domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    nls: "../../i18n",
                    bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min",

                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",

                    amplify : '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',
                    q : '{FENIX_CDN}/js/q/1.1.2/q'
                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    "bootstrap": {
                        deps: ["jquery"]
                    },
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },
                    amplify: {
                        deps: ['jquery'],
                        exports: 'amplifyjs'
                    },
                    application: {
                        deps: ['bootstrap']
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'application',
        'routes',
        'domReady!'
    ], function (Application, routes) {

        new Application({
            routes: routes,
            controllerSuffix: '-controller',
            root: '/voh/',
            pushState: false
        });
    });
});