export default(Vue)=>{

    //拖动
    Vue.directive("drag",function(el,bindings){
        el.onmousedown = function(e){          
            let {arg,value} = bindings;   
            if(value=="false" || value==false || value==0 || value=="0")
                return;          
            let elM = arg&&arg.parent ? el.parentNode :el;          
            var disx = e.pageX - elM.offsetLeft;
            var disy = e.pageY - elM.offsetTop;
            document.onmousemove = function (e){
                elM.style.left = e.pageX - disx+'px';
                elM.style.top = e.pageY - disy+'px';
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
        }
    });

    //尺寸变化监听
    Vue.directive('resize', {
        bind(el, binding) {
          let width = '', height = '';
          function get(){
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
                binding.value({width:style.width, height:style.height});
            }
            width = style.width;
            height = style.height;
          }
          el.__vueReize__ = setInterval(get, 200);
        },
        unbind(el) {
          clearInterval(el.__vueReize__);
        }
    });

}