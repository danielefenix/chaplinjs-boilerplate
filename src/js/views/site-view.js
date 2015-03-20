/*global define*/
define([
    'chaplin',
    'underscore',
    'globals/State',
    'views/base/view',
    'fx-menu/start',
    'text!templates/site.hbs'
], function (Chaplin, _, State, View, Menu, template) {

    'use strict';

    var SiteView = View.extend({

        container: 'body',

        id: 'site-container',

        regions: {
            main: '#main-container'
        },

        template: template,

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //Top Menu
            this.topMenu = new Menu({
                url: 'config/submodules/fx-menu/top_menu.json',
                active: State.path,
                callback: _.bind(this.bindEventListeners, this)
            });
        },

        bindEventListeners : function () {

            this.subscribeEvent('dispatcher:dispatch', _.bind(function (a,b,c) {

                this.topMenu.select(c.controller)

            }, this));
        }

    });

    return SiteView;
});
