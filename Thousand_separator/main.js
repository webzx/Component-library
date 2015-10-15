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
     * ���ǧλ�ָ���
     * @param num ��Ҫ���ǧλ�ָ���������
     * @param decimal ������С��λ��
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
     * ���ַ����е�ǧλ�ָ�תΪ��ͨ����
     * @param num �������ַ���
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