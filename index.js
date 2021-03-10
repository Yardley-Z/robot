var oinput = document.getElementById('send-input')
oinput.onkeyup = function (e) {
    if (e.keyCode == 13) {
        var val = this.value;
        if (val) {
            renderDom('myMes', val)
            this.value = null
            getData(val)
        }
    }
}
var obtn = document.getElementById('send-btn')
obtn.onclick = function () {
    var val = oinput.value.trim();
    if (val) {
        renderDom('myMes', val)
        oinput.value = null
        getData(val)
    }

}
//发送请求函数
function getData(value) {
    ajax({
        url: 'https://developer.duyiedu.com/edu/turing/chat',
        type: 'get',
        data: 'text=' + value,
        success: function (res) {
            renderDom('robotMes', res.text)
        }
    })
}

//渲染内容区
function renderDom(classname, text) {
    var odiv = document.createElement('div');
    odiv.setAttribute('class', 'clearfix ' + classname);
    odiv.innerHTML = ` <div class="avator"></div>
    <div class="text">${text}</div>`
    var ocontent = document.getElementsByClassName('content')[0];
    ocontent.appendChild(odiv)
    ocontent.scrollTop = ocontent.scrollHeight
}