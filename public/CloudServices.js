$(function() {

    var servicesUrl = '/api/services';
    var serviceDoc = {};
    var authHeaders = null;

    function debug(s) {
        console.debug(s);
    }

    function loadServices(callback) {

        debug('loading services from ' + servicesUrl);

        $.ajax({
            url: servicesUrl,
            dataType: 'json'
        })
            .done(function(data) {
                serviceDoc = data;
                $.each(serviceDoc['services'], function(i, e) {
                    debug('loaded service ' + i);
                });
                if (typeof callback == 'function') {
                    callback();
                }
            })
            .fail(function(xhr, status, err) {
                debug('failed to load services: ' + status + ', ' + err);
            });
    }

    function CloudEndpoint(name) {

        if (typeof name == 'undefined' || name == null) {
            this.request = function() {};
            this.url = null;
        } else {
            this.name = name;
            this.url = serviceDoc['services'][name]['href'];
        }

        debug('new CloudEndpoint ' + name + ' with url ' + this.url);

        function addAuthHeaders(req) {
            if (typeof authHeaders != 'undefined') {
                if (typeof req['headers'] == 'undefined') {
                    req['headers'] = {};
                }
                $.each(authHeaders, function(k, v) {
                    if (v == null) {
                        req['headers'][k] = '';
                    } else {
                        req['headers'][k] = v;
                    }
                });
            }
        }

        this.request = function(method, callback, body, headers, url) {

            var theUrl = this.url;
            if (typeof url != 'undefined') {
                theUrl = url;
            }

            var theDataType = 'json';
            if (method == 'DELETE') {
                theDataType = null;
            }

            var req = {
                method: method,
                url: theUrl,
                dataType: theDataType
            };

            if (typeof body != 'undefined') {
                req['data'] = JSON.stringify(body);
                req['contentType'] = 'application/json';
            }

            if (typeof headers != 'undefined') {
                req['headers'] = headers;
            }

            addAuthHeaders(req);

            $.ajax(req)
                .done(function(data) {
                    if (typeof callback == 'function') {
                        callback(data);
                    }
                })
                .fail(function(jqxhr, status, error) {
                    if (typeof callback == 'function') {
                        callback({
                            request_failed: true,
                            info: {
                                status: status,
                                error: error
                            }
                        });
                    }
                });
        };

        this.get = function(callback, headers) {
            this.request('GET', callback, null, headers);
        };

        this.create = function(callback, body, headers) {
            this.request('POST', callback, body, headers);
        };

        this.deleteResource = function(callback, href, headers) {
            this.request('DELETE', callback, null, headers, href);
        };

        this.fileupload = function(callback, selector, formDataCallback) {

            var el = $(selector);

            if (typeof formDataCallback != 'function') {
                formDataCallback = function() { return {}; };
            }

            el.data('url', this.url);
            var req = {
                dataType: 'json',
                done: function (e, data) {
                    if (typeof callback == 'function') {
                        callback(data);
                    }
                },
                fail: function(jqxhr, status, error) {
                    if (typeof callback == 'function') {
                        callback({
                            request_failed: true,
                            info: {
                                status: status,
                                error: error
                            }
                        });
                    }
                }
            };

            addAuthHeaders(req);
            el.fileupload(req);
            el.bind('fileuploadsubmit', function (e, data) {
                data.formData = formDataCallback();
                return true;
            });
        };

        this.getUrl = function() {
            return this.url;
        };
    };

    CloudServices = {

        load: function(callback) {
            loadServices(callback);
        },

        endpoint: function(name) {

            if (typeof name != 'undefined' && typeof serviceDoc['services'][name] != 'undefined') {
                return new CloudEndpoint(name);
            }

            return new CloudEndpoint(null);
        },

        setAuthHeaders: function(headers) {
            if (typeof headers != 'undefined') {
                authHeaders = headers;
            }
        },

        didRequestFail: function(data) {
            return (typeof data['request_failed'] != 'undefined' && data['request_failed']);
        }
    };
});