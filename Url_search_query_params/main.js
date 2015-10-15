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
     * 获取URL中指定参数
     * @param key 参数name
     * @returns {*} 返回参数value
     * @constructor
     */
    function queryString(key) {
        var uri = decodeURIComponent(window.location.search),
            re = new RegExp("[\&\?]" + key + "\=([^\&]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(key.length + 2)) : null);
    }

    /**
     * 获取URL中所有参数
     * @returns {{}} 返回object键值对 例如:{a_name:a_value,b_name:b_name}
     * @constructor
     */
    function queryStrings () {
        var uri = decodeURIComponent(window.location.search),
            re = /\w*\=([^\&]*)/ig,
            params = {},
            arr=[];
        while ((arr = re.exec(uri)) != null) {
            var temp = arr[0].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    }

    return {
        queryString: queryString,
        queryStrings:queryStrings
    }
}));