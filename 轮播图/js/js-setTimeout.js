var banner=document.getElementById('banner');
    var list=document.getElementById('banner-list');
    var buttons=document.getElementById('banner-buttons').getElementsByTagName('span');
    var prev=document.getElementById('banner-prev');
    var next=document.getElementById('banner-next');
    var index=1;
    var animated=false;

    //js定时器实现图片移动
    function bannerAnimate(offset){
        animated=true;
        var newLeft=parseInt(list.style.left)+offset;
        var time=300; //总时间
        var interval=10; //位移间隔时间
        var speed=offset/(time/interval);//每次位移量（总位移量/位移次数）
        function go(){
            if(parseInt(list.style.left)!=newLeft){
                list.style.left=parseInt(list.style.left)+speed+'px';
                setTimeout(go,interval);
            }else{
                animated=false;
                list.style.left=newLeft+'px';
                if(newLeft>-600){
                    list.style.left='-3000px';
                }
                if(newLeft<-3000){
                    list.style.left='-600px';
                }
            }
        }
        go();
    }

    function bannerButton(){
        for(var i=0,l=buttons.length;i<l;i++){
            if(buttons[i].className=='on') {
                buttons[i].className='';
                break;
            }
        }
        buttons[index-1].className='on';
    }
    next.onclick=function(){
        if(animated) return;
        if(index==5){
            index=1;
        }else{
            index+=1;
        }
        bannerButton();
        bannerAnimate(-600);
    }
    prev.onclick=function () {
        if(animated) return;
        if(index==1){
            index=5;
        }else{
            index-=1;
        }
        bannerButton();
        bannerAnimate(600);
    }
    //事件代理事件委托
    document.getElementById('banner-buttons').onclick=function(ev){
        if(animated) return;
        var ev=ev||window.event;
        var target=ev.target||ev.srcElement;
        if(target.tagName=='SPAN'&&target.className==''){
            var offset=(parseInt(target.getAttribute('index'))-index)*-600;
            index=parseInt(target.getAttribute('index'));
            bannerButton();
            bannerAnimate(offset);
        }
    }
    function play() {
        timer=setInterval(function () {
            next.onclick();
        },3000);
    }
    function stop() {
        clearInterval(timer);
    }
    banner.onmouseover=stop;
    banner.onmouseout=play;
    play();