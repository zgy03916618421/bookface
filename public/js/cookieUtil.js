/*本地保存一个文件*/
function setCookie(name, value, expires){//三个参数，一个是cookie的名子，一个是值，最后一个是有效时间，单位是秒
    var exp = new Date();    //new Date("December 31, 9998");
 
    exp.setTime(exp.getTime() + expires*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/*获取本地存储的cookie*/
function getCookie(name){//取cookies函数
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    
    if(arr != null) {
    	return unescape(arr[2]);
    }
    
    return null;
}