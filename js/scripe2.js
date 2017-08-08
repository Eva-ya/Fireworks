$(function() {
	$("body").on("click", function(evt) {
		var evt1 = evt || event;
		new Fire({x:evt1.clientX,y:evt1.clientY}).init().launch();
	})
})

function Fire(a) {
	this.point = a;
	this.element = $("<div class='fire'></div>")
	$("body").append(this.element);
	this.init = function  () {
		this.element.css({
			top:$("body").height()-100,
			left:this.point.x
		})
		return this
	}
	this.launch = function  () {
		var that = this;
		this.element.animate({
			top:this.point.y,
			height:"5px"
		},2000,function  () {
			that.explode();
		})
	}
	this.explode = function  () {
		this.element.remove();
		for (var i = 0; i < 30; i++) {
			new Spark(this.point).init().move()		
		}
	}
}

function Spark(a) {
	this.point = a;
	this.element = $("<div class='spark'></div>")
	$("body").append(this.element);
	this.init = function  () {
		this.element.css({
			top:this.point.y,
			left:this.point.x
		})
		return this
	}
	this.vspeed = Math.floor(Math.random() * 30 + 1) * (Math.random() >= 0.5 ? 1 : -1);
	this.hspeed = Math.floor(Math.random() * 30) * (Math.random() >= 0.5 ? 1 : -1);
	this.move = function  () {
		var that = this;
		var timer = setInterval(function  () {
			if(that.element.offset().top > $("html").height() || that.element.offset().top < 0 || that.element.offset().left > $("html").width() || that.element.offset().left < 0){
				clearInterval(timer);
				that.element.remove();
			}
			that.element.css({
				top:that.element.offset().top+that.hspeed,
				left:that.element.offset().left+that.vspeed
			})
		},20)
	}
}