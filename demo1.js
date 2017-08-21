$(function  () {
	
	$("html").click(function  (eve) {
		var e = eve || event;
		new Fire({
			x:e.clientX,
			y:e.clientY
		}).init().launch();
	})
	
	
});


function Fire (a) {
	this.ele = $("<div class='fire'></div>");
	$("body").append(this.ele);
	this.init = function  () {
		this.ele.css({
			top:$("html").height()-30,
			left:a.x
		});
		return this;
	}
	
	this.launch = function  () {
		var that = this;
		this.ele.animate({
			top:a.y,
			height:5
		},500,function  () {
			that.explode();
		})
	}
	this.explode = function  () {
		this.ele.remove();
		for (var i = 0; i < 30; i++) {
			new Spark(a).init().move();
		}
	}
	
}

function Spark (a) {
	this.ele = $("<div class='spark'></div>");
	this.init = function  () {
		this.ele.css({
			top:a.y,
			left:a.x,
			"background-color":"#"+Math.floor(Math.random()*0xffffff).toString(16)
		})
		$("body").append(this.ele);
		return this;
	}
	this.vspeed = Math.floor(Math.random()*30+1)*(Math.random()>=0.5?1:-1);
	this.hspeed = Math.floor(Math.random()*30+1)*(Math.random()>=0.5?1:-1);
	this.move = function  () {
		var that = this;
		var timer = setInterval(function  () {
			if(that.ele.offset().top > $("html").height() || that.ele.offset().top <0 || that.ele.offset().left > $("html").width() || that.ele.offset().left < 0){
				clearInterval(timer);
				that.ele.remove();
			}
			that.ele.css({
				top: that.ele.offset().top + that.hspeed++,
				left:that.ele.offset().left + that.vspeed
			})
		},20)
	}
	
	
}
