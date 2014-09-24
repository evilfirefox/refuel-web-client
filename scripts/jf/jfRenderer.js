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
        // nested template syntax: %template_path|template_param_name% where template_path is relative path to template file itself and
        // template_param_name (optional) is the property name to pass as data to render method (current data object is passed if not available.
        while ((patternStart = content.indexOf(this.nestedViewPattern)) != -1) {        // searching for nested templates to render
            patternEnd = content.indexOf(this.nestedViewPattern, patternStart + 1);     // searching nested template declaration end
            originalPath = path = content.substring(patternStart + 1, patternEnd);      // getting template path
            if ((delimiter = path.indexOf(this.nestedViewDelimiter)) != -1) {           // checking if nested template is parametrized
                dataKey = path.substring(delimiter + 1, patternEnd);                    // getting data key
                path = path.substring(0, delimiter);                                    // updating path (removing parameter name)
                partialData = (data.hasOwnProperty(dataKey)) ? data[dataKey] : data;    // retrieving parameter data if available
            }
            template = this.loadTemplate(path);
            content = content.replace(this.nestedViewPattern + originalPath + this.nestedViewPattern, this.render(template, partialData));
        }
        while ((patternStart = content.indexOf(this.pattern)) != -1) {
            patternEnd = content.indexOf(this.pattern, patternStart + 1);
            key = content.substring(patternStart + 1, patternEnd);
            actualValue = '';
            if (data.hasOwnProperty(key)) {
                actualValue = data[key];
            }
            content = content.replace(this.pattern + key + this.pattern, actualValue);
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