$(function(){
	alert("操作说明：请选择任意位置单击！");
	$("body").click(function(){
		var ev=ev||event;
		if($(".fire").length<2 && $(".spark").length<100){
			new Fire({
			x:ev.clientX,
			y:ev.clientY
		}).init().launch()
		}
		
	})
})	
	function Fire(a){
//	this.target=a;
	this.ele = $('<div class="fire"></div>')
	$("body").append(this.ele);
	//初始化
	this.init =function(){
		this.ele.css({
			top:$("html").height()-30,
			left:a.x
		})
		return this
	}
	//发射
	this.launch = function(){
		var that=this;
		this.ele.animate({
			top:a.y,
			height:5
		},1000,function(){
			that.explode()
		})
	}
	//消失 ->爆炸
	this.explode = function(){
		this.ele.remove();
		for (var i = 0; i < 80; i++) {
			new Spark(a).init().move();
		}
	}
	
	}
	
	function Spark(a){
		this.ele=$("<div class='spark'></div>");
		$("body").append(this.ele);
		//初始化
		this.init = function(){
			this.ele.css({
				top:a.y,
				left:a.x,
				"background-color":"#"+Math.floor(Math.random()*0xffffff).toString(16)
			})
			return this
		}
		this.wspeed = Math.floor(Math.random()*30+1)*(Math.random()>=0.5?1:-1);
		this.hspeed  = Math.floor(Math.random()*30+1)*(Math.random()>=0.5?1:-1);
		
		//爆炸
		this.move = function(){
			var that=this;
			var timer=setInterval(function(){
				if(that.ele.offset().top>$("html").height()||that.ele.offset().top<0||
				that.ele.offset().left>$("html").width()||that.ele.offset().left<0 )
				{
					clearInterval(timer);
					that.ele.remove();
				}
				that.ele.css({
					top:that.ele.offset().top+that.hspeed++,
					left:that.ele.offset().left+that.wspeed
				})
			},20)
		}
		
	}
	
	

