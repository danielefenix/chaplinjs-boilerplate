/*global define*/
define([
    'views/base/view',
    'text!templates/browse/table.hbs'
], function ( View, template) {

    'use strict';

    var s = {

    };

    var BrowseView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'browse-table',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.bindEventListeners();

            this.initSelectors();
            this.initTable();
        },

        bindEventListeners: function () {

        },

        unbindEventListeners: function () {

        },

        initSelectors : function (){

        },

        initTable : function (){

        },

        dispose: function () {

            this.unbindEventListeners();
            View.prototype.dispose.call(this, arguments);
        }

    });

    return BrowseView;
});
