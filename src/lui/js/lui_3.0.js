import "../css/lui.css"
import "./LuiUtil"

(function(doc,win){

const body = document.querySelector("body");    

function LuiManager(){
    this.rem = 100;
    this.design = 1920;
    this.sClass = ["_scroll", "_con", "_bar"];
}

Object.defineProperties(LuiManager, {
    instance: {get() {return LuiManager._instance || (LuiManager._instance = new LuiManager());}}
});

Object.assign(LuiManager.prototype, {
    InitRem(){
        let rem = this.rem,
            design = this.design,
            docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //默认设计款1920，基本字体大小16px，适配最小字体大小14px,既为 14/16=.875, 1920*.875=1690            
            if(clientWidth<1600)
                docEl.style.fontSize = rem * .875 + 'px';
            else
                docEl.style.fontSize = rem * (clientWidth / design) + 'px';
        };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },
    SetCookie(cname, cvalue, exdays){
        if(!cname)
            return;	
        let pname=this.config?(this.config.name||""):"",
            d = new Date();
        d.setTime(d.getTime() + exdays);
        let expires = "expires="+d.toUTCString();
        document.cookie = pname+"_"+cname + "=" + escape(cvalue) + "; " + expires;
    },
    GetCookie(cname){
        let pname=this.config?(this.config.name||""):"",
            name = pname+"_"+cname + "=",
            ca = document.cookie.split(';');
        for(let i=0; i<ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if(c.indexOf(name) != -1) 
                return unescape(c.substring(name.length, c.length));
        }
        return "";
    },
    DelCookie(cname){
        let pname=this.config?(this.config.name||""):"";
        this.SetCookie(pname+"_"+cname,"",1);
    },
    Waiting(s){
        //加载动画
        if(s) {
            //动画打开
            let _loadDiv = document.createElement('div');
            _loadDiv.innerHTML = `<i><span></span><span></span><span></span><span></span><span></span></i>`;
            _loadDiv.classList.add("loading");
            _loadDiv.setAttribute("id","loading");
            body.append(_loadDiv);
        } 
        else {       
            //动画关闭
            let _loadDiv = document.getElementById("loading"); 
            if (_loadDiv) {
                _loadDiv.remove();
            }
        }
    },
    Hit(t){
        //判断传入参数是否为int
        let hit = Number.isInteger(t);
        let _hitDiv = document.createElement('div');
        //int类型 1操作成功，非1操作失败，非int类型提示传入内容
        _hitDiv.innerHTML = hit?(t==1?"操作成功":"操作失败"):t;
        _hitDiv.classList.add("hit");
        _hitDiv.setAttribute("id","hit");
        body.append(_hitDiv);
        
        setTimeout(function(){ _hitDiv.classList.add("show");},10);
        setTimeout(function(){_hitDiv.classList.remove("show");},2500);
        setTimeout(function(){_hitDiv.remove();},3000);
    },
    Guid(){
        //生成32位guid
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    InitScroll(){            
        let sClass = this.sClass,
            _sMouseWheel = "mousewheel",
            _scrollMove = {};
        if (!("onmousewheel" in document))
            _sMouseWheel = "DOMMouseScroll";
        //在body上添加事件，通过冒泡找到指定元素处理事件
        body.addEventListener(_sMouseWheel, function (e) {
            let ev = e || window.event,
                target = ev.target || ev.srcElement;
            while (target !== body) {
                //当元素为scroll时触发滚动事件
                if (target.className.includes(sClass[0])) {
                    let con = target.firstElementChild,
                        ch = con.clientHeight,
                        sh = con.scrollHeight,
                        st = con.scrollTop;
                    if (sh > ch) {
                        let iWheelDelta = 0;
                        if (ev.wheelDelta) {
                            iWheelDelta = ev.wheelDelta / 120;
                        } else {
                            iWheelDelta = -ev.detail / 3;
                        }
                        con.scrollTop += -1 * 30 * iWheelDelta;
                        target.lastChild.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
                    }
                    break;
                }
                target = target.parentNode;
            }
        });
        body.addEventListener("mousedown", function (e) {
            let ev = e || window.event,
                target = ev.target || ev.srcElement;
            while (target !== body) {
                if(typeof(target.className) != "string")
                    return;
                if (target.className.includes(sClass[2])) {
                    let con = target.previousElementSibling;
                    _scrollMove.barMove = true;
                    _scrollMove.pageY = ev.pageY;
                    _scrollMove.maxMove = con.clientHeight - target.clientHeight;
                    _scrollMove.barOT = target.offsetTop;
                    _scrollMove.bar = target;
                    _scrollMove.con = con;
                    _scrollMove.bar.classList.add("bar-press");
                    con.setAttribute("onselectstart", "return false;");  //chrome禁止内容选中
                    con.setAttribute("unselectable", "on");              //IE禁止内容选中
                    con.classList.add("user-unsel");               //ff禁止内容选中
                    body.addEventListener("mousemove", scrollMouseMove);  //按下滚动条时添加鼠标移动事件，鼠标弹起时移除事件
                    body.addEventListener("mouseup", scrollMouseUp);
                }
                target = target.parentNode;
            }
        });
        function scrollMouseMove(e) {
            let ev = e || window.event,
                target = ev.target || ev.srcElement;
            if (_scrollMove.barMove) {
                let ot = ev.pageY - _scrollMove.pageY + _scrollMove.barOT;
                ot = ot < 0 ? 0 : ot;
                ot = ot > _scrollMove.maxMove ? _scrollMove.maxMove : ot;
                _scrollMove.bar.style.top = ot + "px";
                var st = ot * _scrollMove.con.scrollHeight / _scrollMove.con.clientHeight;
                _scrollMove.con.scrollTop = st;
            }
        }
        function scrollMouseUp() {
            if (_scrollMove.barMove) {
                _scrollMove.barMove = false;
                //移除禁止选中
                _scrollMove.con.removeAttribute("onselectstart");
                _scrollMove.con.removeAttribute("unselectable");
                _scrollMove.con.classList.remove("user-unsel");
                _scrollMove.bar.classList.remove("bar-press");
                body.removeEventListener("mousemove", scrollMouseMove);
                body.removeEventListener("mouseup", scrollMouseUp);
            }
        }

        setInterval(()=>{this.ScrollWatch()}, 167);
    },
    ScrollWatch(){
        let sClass = this.sClass;
        let sall = document.getElementsByClassName(sClass[0]);
        for (let i = 0; i < sall.length; i++) {
            let elem = sall[i],
                con = elem.firstElementChild;
            if (con.scrollHeight > con.clientHeight) {
                if (!elem.lastChild.className || !elem.lastChild.className.includes(sClass[2])) {
                    let _bar = document.createElement('div');
                    _bar.classList.add(sClass[2]);
                    _bar.classList.add("_v");
                    _bar.style.height = (con.clientHeight * con.clientHeight / con.scrollHeight) + "px";
                    _bar.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
                    elem.append(_bar);
                } else {
                    elem.lastChild.style.height = (con.clientHeight * con.clientHeight / con.scrollHeight) + "px";
                    elem.lastChild.style.top = (con.clientHeight * con.scrollTop / con.scrollHeight) + "px";
                }
            }
            else {
                //如果不需要滚动，但页面有滚动条，移除掉
                if (elem.lastChild.className && elem.lastChild.className.includes(sClass[2]))
                    elem.removeChild(elem.lastChild);
            }
        }
    },
    TransListData(data,index){
        let nv = data;         
        if(!nv || !Array.isArray(nv))
            return [];
        else{
            return nv.map((o,i)=>{
                //为了减少参数，将index作了特殊使用，当需要使用的值为索引时，index为>=0的整数，获取的值为选项索引+index；当index === -1时，表示值为名称
                let isName = index === -1;
                //选项数据为错误数据，则添加错误选项 -2
                if(!o)
                    return [-2,""];
                //选项为对象  则取id/name或者Id/Name，没有id/Id 则为错误数据
                if(o.constructor === Object)
                    return [isName?(o.name||o.Name||-2):(o.id||o.Id||-2)+"",o.name||o.Name];
                //选项为数组  只支持[value,name] --暂未作详细判断
                else if(o.constructor == Array)
                    return o.length==2 ? o : [-2,""];
                //简单值类型  则取索引作为值
                else
                    return [isName?o:(i+index+""),o];
            });
        }
    },
    Init() { 
        this.InitRem();
        //实例scroll
        this.InitScroll(); 
    }
});

function Lui(){
    if (!!window.Lui) {
        return console.log("error", "Lui对象已定义");
    }
    window.Lui   = this;

    LuiManager.instance.Init();
}

Object.assign(Lui.prototype,{        
    Waiting(s){
        return LuiManager.instance.Waiting(s);
    },
    Hit(t){
        return LuiManager.instance.Hit(t);
    },
    Cookie: {
        Add(k,v,time){
            return LuiManager.instance.SetCookie(k,v,time);
        },
        Get(k){
            return LuiManager.instance.GetCookie(k);
        },
        Del(k){
            return LuiManager.instance.DelCookie(k);
        }
    },
    File: {
        JsonData(name){
            return LuiManager.instance.fileData(name);
        },
        Str(json){
            return LuiManager.instance.FileStr(json);
        },
        Split(str){
            return LuiManager.instance.FileStrRes(str);
        }
    },
    Guid(){
        return LuiManager.instance.Guid();
    },
    TransListData(data,index){
        return LuiManager.instance.TransListData(data,index)
    },
    FYJS(s,e){
        return computed(s,e);
    }
});    

new Lui();


// function computed(s, e){
//     if(new Date(s).getTime() > new Date(e).getTime())
//         return 0;

//     let fm = "yyyy-MM-dd",
//         fy = [[60,100,140],[100,140,180]];
//     let end = new Date(e).format(fm),
//         day = 0,
//         count = 0;
        
//     while(day>=0){
//         let ce = new Date(s).addDays(day,fm),
//             ceArr = ce.split("-"),
//             ceMDInt = +(ceArr[1]+ceArr[2]);
//             //判断是否在夏天高温期内
//         let index1 = (ceMDInt>=601 && ceMDInt<=930) ? 1 : 0,
//             //1-4天0 5-8天1  9天2
//             index2 = day<4 ? 0 : (day>7 ? 2 : 1); 
//         //累计当天费用           
//         count += fy[index1][index2];

//         if(ce == end)
//             day = -1;
//         else
//             day ++;
//     }
//     return count;
// }

})(document, window);