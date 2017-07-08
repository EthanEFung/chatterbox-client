
// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-Id', 'FILL-ME-IN', 'PARSE_APP_ID');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', 'FILL-ME-IN', 'PARSE_API_KEY');
});