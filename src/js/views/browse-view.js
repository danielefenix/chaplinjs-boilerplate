/*global define*/
define([
    'chaplin',
    'backbone',
    'underscore',
    'jquery',
    'views/base/view',
    'views/browse/scores-view',
    'views/browse/table-view',
    'text!templates/browse.hbs'
], function (Chaplin, Backbone, _, $, View, Scores, Table, template) {

    'use strict';

    var s = {
        TABS: '#browse-tabs',
        TABS_LINKS :'#browse-tabs [role="tablist"] a',
        VIEW_SCORES: '#browse-scores',
        VIEW_TABLE: '#browse-table'
    };

    var BrowseView = View.extend({

        initialize : function (options) {
            View.prototype.initialize.apply(this, arguments);

            this.params = options.params;
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'browse',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        render: function() {
            View.prototype.render.apply(this, arguments);

            //Register Scores subview
            var scoresView = new Scores({autoRender: true, container: this.$el.find(s.VIEW_SCORES)[0]});
            this.subview('scores', scoresView);

            //Register Table subview
            var tableView = new Table({autoRender: true, container: this.$el.find(s.VIEW_TABLE)[0]});
            this.subview('table', tableView);
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.bindEventListeners();

            this.initPage();
        },

        initPage: function () {

            //Remove bootstrap click handler
            this.$el.find(s.TABS_LINKS).off();

            //Bind custom handler
            this.$el.find(s.TABS_LINKS).on('click', _.bind(this.onTabClick, this));

            //Show correct tab
            this.showTab();
        },

        onTabClick : function (e) {

            this.params.section = $(e.target).attr('aria-controls');

            Backbone.history.navigate('browse/'+ this.params.section , { trigger: false });

            this.showTab();
        },

        showTab : function () {

            this.$el.find(s.TABS).find('a[href="#'+this.params.section+'"]').tab('show');
        },

        bindEventListeners: function () {  },

        unbindEventListeners: function () {
            this.$el.find(s.TABS_LINKS).off();
        },

        dispose: function () {

            this.unbindEventListeners();
            View.prototype.dispose.call(this, arguments);
        }

    });

    return BrowseView;
});
