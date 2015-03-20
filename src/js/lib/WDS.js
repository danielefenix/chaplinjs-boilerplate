/*global define*/
define([
    'jquery',
    'underscore',
    'config/Config'
], function ($, _, Config) {

    'use strict';

    function WDS() {
    }

    WDS.prototype.GET = function ( o ) {

        var sqltmpl, sql;

        if (queryVars) {
            sqltmpl = _.template(queryTmpl);
            sql = sqltmpl(queryVars);
        }
        else {
            sql = queryTmpl;
        }

        var data = {
            datasource: Config.DB_NAME,
            thousandSeparator: ',',
            decimalSeparator: '.',
            decimalNumbers: 2,
            cssFilename: '',
            nowrap: false,
            valuesIndex: 0,
            json: JSON.stringify({query: sql})
        };

        $.ajax({
            url: Config.WDS_URL,
            data: data,
            type: 'POST',
            dataType: 'JSON',
            success: o.callback,
            error: o.error
        });

    };

    //Singleton
    return new WDS();

});