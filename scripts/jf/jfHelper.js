/**
 * Created by devastator on 6/30/14.
 */

var jfHelper = {
    getPage: function () {
        url = document.location.href;
        return ((index = url.indexOf('#')) != -1) ? url.substring(index + 1) : 'home';
    },
    resolvePath: function (type, name) {
        return jfConfig.routing.baseUrl + type + name + jfConfig.routing.extension;
    },
    importTemplate: function (name) {
        var result;
        $.ajax(this.resolvePath(jfConfig.routing.templatesPath, name), {
            method: 'GET',
            async: false,
            success: function (data, status, xhr) {
                result = data;
            },
            error: function (xhr, status, error) {
                jfHelper.writeLog(status, error);
            }
        });
        return result;
    },
    writeLog: function (status, message) {
        if (jfConfig.general.isDebug) {
            console.log('(' + status + ') ' + message);
        }
    },
    handleAjaxCollection: function (ajaxUrl, templateName, targetContainer, successHandler, errorHandler) {
        $.ajax(ajaxUrl, {
            method: 'GET',
            async: false,
            success: function (data, status, xhr) {
                var template = jfRouter.importTemplate(templateName);
                targetContainer.empty();
                for (i in data) {
                    value = jfRouter.render(template, data[i]);
                    targetContainer.append(value);
                }
                successHandler(status, data);
            },
            error: function (xhr, status, error) {
                jfHelper.writeLog(status, error);
                errorHandler(status, error);
            }
        });
    },
    getAjaxCollection: function (ajaxUrl, successHandler, errorHandler) {
        $.ajax(ajaxUrl, {
            method: 'GET',
            async: false,
            success: function (data, status, xhr) {
                successHandler(status, data);
            },
            error: function (xhr, status, error) {
                jfHelper.writeLog(status, error);
                errorHandler(status, error);
            }
        });
    },
    postErrorMessage: function (status, message) {
        app.ui.error.header.empty().append('Error (' + status + ')');
        app.ui.error.body.empty().append(message);
        app.ui.error.container.show();
    },
    createJsonRequest: function (base){
        var jsonData = '';
        $(base + ' input[name]').each(function (index) {
            jsonData += '"' + $(this).attr('name') + '":"' + $(this).attr('value') + '",'
        });
        jsonData = '{' + jsonData.substr(0, (jsonData.length - 1)) + '}';
        return jsonData;
    }
}