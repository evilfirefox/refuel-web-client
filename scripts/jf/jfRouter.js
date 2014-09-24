/**
 * Created by devastator on 6/30/14.
 */

var jfRouter = {

    getPage: function () {
        url = document.location.href;
        return ((index = url.indexOf('#')) != -1) ? url.substring(index + 1) : 'home';
    },
    resolvePath: function (type, name) {
        return jfConfig.routing.baseUrl + type + name + jfConfig.routing.extension;
    }
}