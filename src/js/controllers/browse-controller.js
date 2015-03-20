/*global define*/
define([
    'chaplin',
    'underscore',
    'controllers/base/controller',
    'views/browse-view',
    'q'
], function (Chaplin, _, Controller, BrowseView, Q) {
    'use strict';

    var BrowseController = Controller.extend({

        beforeAction: function (params, options) {
            Controller.prototype.beforeAction.apply(this, arguments);

            return this.check(params, options).then(undefined, _.bind(function () {
                this.auth = false;
            }, this));
        },

        check: function (params) {

            return Q.Promise(function (resolve, reject) {

                if (!params.hasOwnProperty('section') || params.section === '' || !params.section) {
                    reject();
                    return;
                }

                if (params.section === 'scores' || params.section === 'table') {
                    resolve()
                } else {
                    reject();
                }
            });
        },

        show: function (params) {

            if (this.auth === false) {
                Backbone.history.navigate('browse/scores', { trigger: true, replace: true });
                return;
            }

            this.view = new BrowseView({
                region: 'main',
                params: params
            });
        }

    });

    return BrowseController;
});
