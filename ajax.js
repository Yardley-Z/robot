function ajax(option) {
    var url = option.url || '';
    var type = option.type.toUpperCase() || 'GET';
    var data = option.data || ''; //默认格式 key=value & key1=value1
    var success = option.success || '';
    var err = option.err || '';
    var async = typeof option.async === 'boolean' ? async :true;
    //请求拦截函数，若返回false不发送网络请求，否则发送
    var beforeSend = option.beforeSend || function (xhr) {
        return xhr
    };
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTO')
    } else {
        return alert('当前浏览器不支持XMLHttpRequest')
    }

    //xhr.readyState 有0 - 4 
    // 0 建立连接之前
    // 1 建立连接 调用open方法了
    // 2 open调用完了，等待发送数据
    // 3 正在发送和接收数据
    // 4 整个请求完成，对方已经给予回应
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            } else {
                err(JSON.parse(xhr.responseText))
            }
        }
    }
    if (!beforeSend(xhr)) {
        return false;
    }
    if (type == 'GET') {
        xhr.open(type, url + '?' + data, async);
        xhr.send();
    } else {
        //建立连接
        xhr.open(type, url, async);
        //设置请求头，设置编码类型 （编码类型指代的是，传递过程当中数据的格式，后台在接受到这个请求的时候，应该以什么格式解析
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        //传递数据
        xhr.send(data)
    }

}