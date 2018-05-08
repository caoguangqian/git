/*
* @Author: Marte
* @Date:   2018-05-08 09:50:10
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-08 14:46:32
*/

'use strict';
window.onload=function(){
    var list=document.getElementById("list");
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");

    function animate(offset){
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值。需要用parseint取整
        var newLeft=parseInt(list.style.left)+offset;
        list.style.left=newLeft+"px";
        if(newLeft<-1600){
            list.style.left=-400+"px";
        }
        if(newLeft>-400){
            list.style.left=-1600+"px";
        }
    }
    prev.onclick=function(){
        animate(400);
    }
    next.onclick=function(){
        animate(-400);
    }

    //定时器
    var timer;
    function play(){
        timer=setInterval(function(){
            next.onclick()
        },1500)
    }
    play();

    //清除定时
    var container=document.getElementById("container");
    function stop(){
        clearInterval(timer);
    }


    //控制小圆点,单击左右箭头
    var buttons=document.getElementById("buttons").getElementsByTagName("span");
    var index=1;
    function buttonsShow(){
        //清除之前的样式
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className=="";
            }
        }
        buttons[index-1].className="on";
    }

    prev.onclick=function(){
        index-=1;
        if(index<1){
            index=4;
        }
        buttonsShow();
        animate(400);
    }
    next.onclick=function(){
        //由于定时器作用，index会一直递增
        index+=1;
        if(index>4){
            index=1;
        }
        buttonsShow();
        animate(-400);
    }

    //小圆点正常显示
    for(var i=0;i<buttons.length;i++){
        (function(i){
            buttons[i].onclick=function(){
            console.log(i);//控制台打印
            /*
            偏移量获取：获得鼠标移动到小圆点的位置，用this把index绑定
            到对象buttons[i]上；
            由于这里的index是自定义属性，需要用到getAttribute方法
             */
            var clickIndex=parseInt(this.getAttribute("index"));
            var offset=400*(index-clickIndex);
            animate(offset);//存放鼠标点击后的位置
            index=clickIndex;
            buttonsShow;
        }
    })(i)
    }



    //鼠标经过停止动画
    container.onmouseover=stop;
    //鼠标离开开始动画
    container.onmouseout=play;
}