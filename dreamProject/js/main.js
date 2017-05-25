function banner(config){
	var banBox=$(config.banBox);
	var paginHtml='<span class="swiper-pagination-bullet"></span>'
	var paginBox=$(config.paginBox);
	var banPrev=$(".ban-btn .prev");
	var banNext=$(".ban-btn .next");
	var banLi=$(config.banLi);
	var banLength=banLi.length;
	var banLiFirst=banLi.first().clone();
	var banLiLast=banLi.last().clone();
	banBox.append(banLiFirst);
	banBox.prepend(banLiLast);
	banLi=$(".banner ul li");
	banLi.eq(1).addClass("active");
	var windowWidth=$(window).width();
	var windowHeight=$(window).height();
	if(windowWidth<1000){
		windowWidth=1000;
	}
	banLi.each(function(){
		$(this).find(".item-bg").css("background-image","url("+$(this).attr("attr")+")");
	})
	if(banLength>1){
		for(var i=0;i<banLength;i++){
			paginBox.append(paginHtml);
		}
		var paginLi=$(".swiper-pagination .swiper-pagination-bullet");
		paginLi.eq(0).addClass("active");
	}
	var statusCons={NOMAL:1,RUN:2};
	var statusMap={index:1,nowStatus:statusCons.NOMAL};
	var animaConfig={time:500};
	var timeoutIdentify=null;
	var functionMap={animEnd:function(){
		timeoutIdentify=setTimeout(function(){
			timeoutIdentify=null;
			//动画结束的操作
			statusMap.nowStatus=statusCons.NOMAL;
			if(animaConfig.direct=='next'){
				transitionNext();
			}else{
				transitionPrev();
			}
		},(animaConfig.time));
	},
	animStar:function(direct){
		if(timeoutIdentify!=null){
			return false;
		}
		animaConfig.direct=direct;

		statusMap.nowStatus=statusCons.RUN;
		var i=getNumber(direct);
		var time=animaConfig.time/1000;
		banBox.css({"transform":"translate3d("+-i*windowWidth+"px,0px,0px)","transition-duration":time+"s"});
		return true;
	},
	isAnim:function(){
		return statusMap.nowStatus==statusCons.RUN
	}};
	function animCss(time,number){
		time=time/1000;
		banBox.css({"transform":"translate3d("+-number*windowWidth+"px,0px,0px)","transition-duration":time+"s"});
	}
	 
	function resize(){
		windowWidth=$(window).width();
		if(windowWidth<1000){
			windowWidth=1000;
		}
		windowHeight=$(window).height();
		banLi.css("width",windowWidth);
		banLi.css("height",windowHeight);
		banBox.css("height",windowHeight);
		banBox.width((banLength+2)*windowWidth);
		var i=getNowIndex();
		animCss(0,i);
	}
	function init(){
		$(window).resize(resize);
		resize();
		banBox.css({"transform":"translate3d("+-1*windowWidth+"px,0px,0px)","transition-duration":"0s"});
	}
	function getNowIndex(){
		return statusMap.index;
	}
	function setNowIndex(index){
		statusMap.index=index;
	}
	function getNumber(direct){
		if(direct=='prev'){
			return prevNum();
		}else if(direct=='next'){
			return nextNum();
		}
	}
	function nextNum(){
		var i=getNowIndex();
		i++;
		setNowIndex(i);
		return i;
	}
	function prevNum(){
		var i=getNowIndex();
		i--;
		setNowIndex(i);
		return i;
	}
	function transitionNext(){
		var i=getNowIndex();
		if(i==banLength+1){
			i=1;
			setNowIndex(i);
			animCss(0,i);
		}
	}
	
	function transitionPrev(){
		var i=getNowIndex();
		if(i<=0){
			i=banLength;
			setNowIndex(banLength);
			animCss(0,i);
		}
	}
	function NextFn(){
		//var i=getNumber('next');
//		console.log(i);
	/*	i++;
		console.log(i);
		if(i==banLength+1){
			setTimeout(function(){
				i=1;
				banBox.css({'transform':'translate3d('+-i*windowWidth+'px,0px,0px)','transition-duration':'0s'});
			},500);
		}*/
		if(functionMap.animStar('next')){
			functionMap.animEnd();
			setMark();
		}
		//transitionNext();
	};
	function PrevFn(){
//		var i=getNumber('prev');
		/*i--;
		if(i<=0){
			setTimeout(function(){
				i=banLength;
				banBox.css({'transform':'translate3d('+-i*windowWidth+'px,0px,0px)','transition-duration':'0s'});
			},500);
		}*/
		if(functionMap.animStar('prev')){
			functionMap.animEnd();
			setMark();
		}
//		transitionPrev();
	};
	
	function setMark(){
		var i=getNowIndex();
		paginLi.eq((i%banLength)-1).addClass("active").siblings().removeClass("active");
	}
//	function activeAnime(){
//		var l=$(".swiper-pagination .active").index();
//		console.log(l);
//		banLi.eq(l+1).addClass("active").siblings().removeClass("active");
//	}
	paginLi.click(function(){
		var i=$(this).index()+1;
		setNowIndex(i);
		animCss(animaConfig.time,i);
		setMark();
//		console.log(i)
	})
	banPrev.click(PrevFn);
	banNext.click(NextFn);
	function showAuto(){
		NextFn();
	}
//	setInterval(function(){
//		showAuto();
//	},6000);
	
	init();
}