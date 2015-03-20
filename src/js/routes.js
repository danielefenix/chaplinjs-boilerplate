/*global define*/
define(function() {
  'use strict';

  // The routes for the application. This module returns a function.
  // `match` is match method of the Router
  return function(match) {
    match('', 'home#show');
    match('browse(/:section)', 'browse#show');
    match('download', 'download#show');
    match('*anything', '404#show');
  };
});
