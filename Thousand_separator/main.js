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
     * 添加千位分隔符
     * @param num 需要添加千位分隔符的数字
     * @param decimal 保留的小数位数
     * @returns {string|*}
     */
    function separated(num,decimal) {

        decimal = (isNaN(decimal) || parseInt(decimal)<0) ? 2 : decimal;
        num = parseFloat(num).toFixed(decimal) +"";

        var re = /(-?\d+)(\d{3})/;
        while (re.test(num)) {
            num = num.replace(re, "$1,$2");
        }
        return num;
    }

    /**
     * 将字符串中的千位分割转为普通数字
     * @param num 操作的字符串
     * @returns {Number}
     */
    function unseparated(num) {
        var num_arr = num.split(',');
        return parseFloat(num_arr.join(""));
    }

    return {
        separated : separated,
        unseparated : unseparated
    }
}));