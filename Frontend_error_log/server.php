<?php
/**
 * File Description:服务器端收集Javascript的报错信息，生成到log.txt中
 * Date: 2015/10/11 2:46
 */

date_default_timezone_set('Asia/Shanghai');

$date = date('Y-m-d H:i:s', time());

/**
 * Javascript的报错信息
 */
if (isset($_GET['errorType']) && $_GET['errorType'] == "Javascript") {
    $errorType = $_GET['errorType'];
    $ua = $_GET['ua'];
    $message = $_GET['message'];
    $url = $_GET['url'];
    $pageurl = $_GET['pageurl'];
    $line = $_GET['line'];
    $browser = $_GET['browser'];
    $system = $_GET['system'];

    $error = $date . "----" . $errorType . " Error:" . $line . "行----" .  $message . "----" . $browser . "----" . $system . "----出错文件：" . $url ."----出错页面:". $pageurl."\r\n";
}

/**
 * Images的报错信息
 */
if (isset($_GET['errorType']) && $_GET['errorType'] == "Images") {
    $errorType = $_GET['errorType'];
    $src = $_GET['src'];
    $url = $_GET['url'];

    $error = $date . "----" . $errorType . " Error:" . $src . "----" . $url . "\r\n";

}

file_put_contents('log.txt', $error, FILE_APPEND);