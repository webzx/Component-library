(function (factory) {
    if (typeof define === 'function' && define.cmd) {
        // CMD，模块化代码
        define(function (require, exports, module) {
            return factory();
        });
    } else {
        // 如果define没有被定义，正常执行插件代码。将方法封装在自定义命名空间 $.cPlugin中
        $.cPlugin = $.cPlugin ? $.cPlugin : {};
        $.extend($.cPlugin, factory());
    }
}(function () {
    /**
     * 检测浏览器是否支持某CSS3属性
     * @param style
     * @returns {boolean}
     */
    function supportCss3(style) {
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };

        for (i in prefix)
            humpString.push(_toHumb(prefix[i] + '-' + style));

        humpString.push(_toHumb(style));

        for (i in humpString)
            if (humpString[i] in htmlStyle) return true;

        return false;
    }

    return {
        supportCss3: supportCss3
    }
}));