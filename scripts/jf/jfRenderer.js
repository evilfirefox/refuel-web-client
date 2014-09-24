/**
 * Created by devastator on 9/24/14.
 */

var jfRenderer = {
    pattern: '#',
    nestedViewPattern: '%',
    nestedViewDelimiter: '|',
    loadTemplate: function (templatePath) {
        templatePath = templatePath.replace('.', '/');
        return this.importTemplate(templatePath);
    },
    render: function (template, data) {
        content = template;
        while ((patternStart = content.indexOf(this.nestedViewPattern)) != -1) {
            patternEnd = content.indexOf(this.nestedViewPattern, patternStart + 1);
            originalPath = path = content.substring(patternStart + 1, patternEnd);
            if ((delimiter = path.indexOf(this.nestedViewDelimiter)) != -1) {
                dataKey = path.substring(delimiter + 1, patternEnd);
                path = path.substring(0, delimiter);
                partialData = (data.hasOwnProperty(dataKey)) ? data[dataKey] : data;
            }
            template = this.loadTemplate(path);
            content = content.replace(jfRenderer.nestedViewPattern + originalPath + jfRenderer.nestedViewPattern, this.render(template, partialData));
        }
        while ((patternStart = content.indexOf(this.pattern)) != -1) {
            patternEnd = content.indexOf(this.pattern, patternStart + 1);
            key = content.substring(patternStart + 1, patternEnd);
            actualValue = '';
            if (data.hasOwnProperty(key)) {
                actualValue = data[key];
            }
            content = content.replace(jfRenderer.pattern + key + jfRenderer.pattern, actualValue);
        }
        return content;
    },
    importTemplate: function (name) {
        var result;
        $.ajax(jfRouter.resolvePath(jfConfig.routing.templatesPath, name), {
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
    }
}