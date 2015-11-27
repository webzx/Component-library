(function (factory) {
    if (typeof define === 'function' && define.cmd) {
        // CMD��ģ�黯����
        define(function (require, exports, module) {
            return factory();
        });
    } else {
        // ���defineû�б����壬����ִ�в�����롣��������װ���Զ��������ռ� $.cPlugin��
        $.cPlugin = $.cPlugin ? $.cPlugin : {};
        $.extend($.cPlugin, factory());
    }
}(function () {
    /**
     * ���������Ƿ�֧��ĳCSS3����
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