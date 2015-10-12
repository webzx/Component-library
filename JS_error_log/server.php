<?php
/**
 * File Description:���������ռ�Javascript�ı�����Ϣ�����ɵ�log.txt��
 * Date: 2015/10/11 2:46
 */

date_default_timezone_set('Asia/Shanghai');

$date = date('Y-m-d H:i:s', time());

/**
 * Javascript�ı�����Ϣ
 */
if (isset($_GET['errorType']) && $_GET['errorType'] == "Javascript") {
    $errorType = $_GET['errorType'];
    $ua = $_GET['ua'];
    $message = $_GET['message'];
    $url = $_GET['url'];
    $line = $_GET['line'];
    $browser = $_GET['browser'];
    $system = $_GET['system'];

    $error = $date . "----" . $errorType . " Error:" . $line . "��----" . $message . "----" . $browser . "----" . $system . "----" . $url . "\r\n";
}

/**
 * Images�ı�����Ϣ
 */
if (isset($_GET['errorType']) && $_GET['errorType'] == "Images") {
    $errorType = $_GET['errorType'];
    $src = $_GET['src'];
    $url = $_GET['url'];

    $error = $date . "----" . $errorType . " Error:" . $src . "----" . $url . "\r\n";

}

file_put_contents('log.txt', $error, FILE_APPEND);