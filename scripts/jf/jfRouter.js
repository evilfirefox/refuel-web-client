/**
 * Created by devastator on 6/30/14.
 */

var jfRouter = {
    pattern: '#',
    nestedViewPattern: '%',
    nestedViewDelimiter: '|',
    importTemplate: function (name) {
        return jfHelper.importTemplate(name);
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
            content = content.replace(jfRouter.nestedViewPattern + originalPath + jfRouter.nestedViewPattern, this.render(template, partialData));
        }
        while ((patternStart = content.indexOf(this.pattern)) != -1) {
            patternEnd = content.indexOf(this.pattern, patternStart + 1);
            key = content.substring(patternStart + 1, patternEnd);
            actualValue = '';
            if (data.hasOwnProperty(key)) {
                actualValue = data[key];
            }
            content = content.replace(jfRouter.pattern + key + jfRouter.pattern, actualValue);
        }
        return content;
    },
    loadTemplate: function (templatePath) {
        templatePath = templatePath.replace('.', '/');
        return jfHelper.importTemplate(templatePath);
    }
}