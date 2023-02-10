(function (window) {
  window['env'] = window['env'] || {};

  // Environment variables
  window['env']['api_hostname'] = '${API_HOSTNAME}';
  window['env']['api_port'] = '${API_PORT}';
})(this);
