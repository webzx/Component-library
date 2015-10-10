/**
 * 文件说明：Javascript 的错误捕获，此代码应放在所有javascript代码的最前面
 * 创建日期：2015/9/21.
 * 创建人：jsonzhang
 * 备注：
 */

/**
 * 捕捉JS错误
 */
window.onerror = function (message, url, line, colum, errorObj) {

    var msg = "",
        clientInfo = new clientInfo();

    //错误类型:javascript
    msg += "errorType=Javascript";

    //客户端信息
    msg += "&ua=" + window.navigator.userAgent;

    //错误消息
    msg += "&message=" + message;

    //出错页面url
    msg += "&url=" + url;

    //错误行数
    msg += "&line=" + line;

    //浏览器信息
    msg += "&browser=" + clientInfo.getBrowserInfo();

    //系统信息
    msg += "&system=" + clientInfo.getOSInfo();

    //服务器地址
    new Image().src = "/server.php?" + decodeURIComponent(msg);

    function clientInfo() {
        this.agent = navigator.userAgent.toLowerCase();
        //获取浏览器信息
        this.getBrowserInfo = function () {
            /**
             * 浏览器参照：
             * Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E) IE
             * Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0                                                        mozilla
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36 OPR/32.0.1948.25   opera
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36                   chrome
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2                      safari
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36                     360
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/4.4.7.1000 Chrome/30.0.1599.101 Safari/537.36 Maxthon
             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36 SE 2.X MetaSr 1.0  搜狗
             */
            var regexp_IE = /msie [\d.]+/gi, //IE
                regexp_FF = /firefox\/[\d.]+/gi, // Firefox
                regexp_AppleWebKit = /applewebkit\/[\d.]+/gi, //AppleWebKit 内核
                regexp_Chrome = /chrome\/[\d.]+/gi, //Chrome
                regexp_Safari = /safari\/[\d.]+/gi, //Safari
                regexp_Opera = /opr\/[\d.]+/gi; //Opera

            //IE
            if (this.agent.indexOf("msie") > 0) {
                var ie_info = this.agent.match(regexp_IE);
                if (ie_info && ie_info.length) {
                    return ie_info[0];
                }
                return "MSIE未知版本;";
            }

            //Firefox
            if (this.agent.indexOf("firefox") > 0) {
                var ff_info = this.agent.match(regexp_FF);
                if (ff_info && ff_info.length) {
                    return ff_info[0];
                }
                return "Firefox未知版本;";
            }

            /**
             * Safari -> Opera -> Chrome 次序不可逆
             * Chrome中包含很多基于AppleWebKi内核浏览器，比如：360、搜狗、遨游
             */

            //Opera
            if (this.agent.indexOf("opr") > 0) {
                var opera_info = this.agent.match(regexp_Opera);
                if (opera_info && opera_info.length) {
                    return opera_info[0];
                }
                return "Opera未知版本;" + this.agent;
            }

            //Safari
            //android上基于webkit内核浏览器大概信息：mozilla/5.0 (linux; u; android 4.4.4; zh-cn;) appliewebkit/533.1 (khtml,like gecko)version/4.0 mobile safari/533.1;
            //所以android上基于webkit内核浏览器，统一显示为appliewebkit内核浏览器
            if (this.agent.indexOf("safari") > 0 && this.agent.indexOf("chrome") < 0 && !(this.agent.indexOf("android") > -1)) {
                var safari_info = this.agent.match(regexp_Safari);
                if (safari_info && safari_info.length) {
                    return safari_info[0];
                }
                return "Safari未知版本;";
            }

            //Chrome
            if (this.agent.indexOf("chrome") > 0) {
                var chrome_info = this.agent.match(regexp_Chrome);
                if (chrome_info && chrome_info.length) {
                    return chrome_info[0];
                }
                return "Chrome未知版本;";
            }

            //基于webkit的未知浏览器
            if (this.agent.indexOf("applewebkit") > 0) {
                var webkit_info = this.agent.match(regexp_AppleWebKit);
                if (webkit_info && webkit_info.length) {
                    return webkit_info[0];
                }
                return "webkit未知版本";
            }
        };
        //获取系统信息
        this.getOSInfo = function () {

            /**
             *  参照：
             *  Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.20 Mobile Safari/537.36 安卓
             *  Mozilla/5.0 (MeeGo; NokiaN9) AppleWebKit/534.13 (KHTML, like Gecko) NokiaBrowser/8.5.0 Mobile Safari/534.13   //meeGo
             *  Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 520) // Windows Phone
             *  Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 ipad
             *  Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5 ipad mini
             *  Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5 iphone 4
             *  Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53 iphone 5
             *  Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4 iphone 6
             *  Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4 iphone 6+
             *  Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 4 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36 GN4
             *  Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Safari/537.36 GN7
             *
             *  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9   mac
             *  Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36
             *  Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36 win
             *  Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20131029 Firefox/17.0 LINUX
             */
            if (this.agent.indexOf('mobile') > -1) { //移动环境
                var regexp_android = /android [\d.]+/gi, //Android
                    regexp_ios = /os [\d_.]+/gi, //IOS
                    regexp_wp = /windows phone [\d.]+/gi; //Windows Phone

                //Android系统
                if (this.agent.indexOf("android") > -1) {
                    var android_info = this.agent.match(regexp_android);
                    if (android_info && android_info.length) {
                        return android_info[0];
                    }
                    return "android未知版本;";
                }

                //Ios系统
                if (this.agent.indexOf("os") > -1) {
                    var ios_info = this.agent.match(regexp_ios);
                    if (ios_info && ios_info.length) {
                        return ios_info[0];
                    }
                    return "ios未知版本;";
                }

                //Windows Phone 系统
                if (this.agent.indexOf("windows phone") > -1) {
                    var wp_info = this.agent.match(regexp_wp);
                    if (wp_info && wp_info.length) {
                        return wp_info[0];
                    }
                    return "windows phone未知版本;";
                }

                return "未知手机系统;未知版本";

            } else { //PC环境
                var regexp_windows = /windows nt [\d.]+/gi, //Android
                    regexp_linux = /\([^\)]+\)/i, //Linux- 查找第一个()
                    regexp_mac_os = /mac os x [\d_.]+/gi; //IOS

                //Windows 系统
                if (this.agent.indexOf("windows nt") > -1) {
                    var win_info = this.agent.match(regexp_windows);
                    if (win_info && win_info.length) {
                        var version = win_info[0].match(/[\d.]+/)[0],
                            publish_name = "";
                        switch (version) {
                            case "5.0" :
                                publish_name = "Windows 2000";
                                break;
                            case "5.1" :
                                publish_name = "Windows XP";
                                break;
                            case "5.2" :
                                publish_name = "Windows Server 2003";
                                break;
                            case "6.0" :
                                publish_name = "Windows Vista / Windows Server 2008";
                                break;
                            case "6.1" :
                                publish_name = "Windows 7 / Windows Server 2008 R2";
                                break;
                            case "6.2" :
                                publish_name = "Windows 8";
                                break;
                            case "6.3" :
                                publish_name = "Windows 8.1";
                                break;
                            case "10" :
                                publish_name = "Windows 10";
                                break;
                            default :
                                publish_name = "windows未知发行版名称，内核版本:" + win_info[0];
                        }
                        return publish_name;
                    }
                    return "window未知版本;";
                }


                //Linux系统
                if (this.agent.indexOf("linux") > -1) {
                    var linux_info = this.agent.match(regexp_linux);
                    return linux_info[0];
                }

                //Mac os 系统
                if (this.agent.indexOf("mac os x") > -1) {
                    var mac_os_info = this.agent.match(regexp_mac_os);
                    if (mac_os_info && mac_os_info.length) {
                        return mac_os_info[0];
                    }
                    return "Mac OS未知版本;";
                }
            }
        };
    }

    //todo:return true-控制台不显示错误信息， return false-控制台显示错误信息，后期可以对项目版本选择性显示
    return false;
}

/**
 * 捕捉图片错误
 */
window.onload = function () {
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        images[i].onerror = function () {
            //console.log(document.getElementsByTagName('img')[0]);
            var msg = "errorType=Images";
            msg += "&src=" + this.src;
            msg += "&url=" + window.location.href;

            new Image().src = "/server.php?" + decodeURIComponent(msg);
        }
    }
}