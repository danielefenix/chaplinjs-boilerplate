/*global define*/
define([
    'controllers/base/controller',
    'views/404-view'
], function (Controller, NotFoundView) {
    'use strict';

    var HomeController = Controller.extend({

        show: function (params) {

            this.view = new NotFoundView({
                region: 'main'
            });
        }
    });

    return HomeController;
});
