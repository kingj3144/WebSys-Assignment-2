$.fn.hexed = function(settings){


	function createCanvas(color){
		var canvas = $("<canvas></canvas>");
		canvas.attr("id", "canvas");
		canvas.attr("heigh", 200);
		canvas.attr("width", 200);
		var context = canvas[0].getContext("2d");
		// Set the color of the fill
		context.fillStyle="#" + color;

		// Start a new path
		context.beginPath();

		context.arc(100,100,50,0,Math.PI*2,true);

		// Close the path
		context.closePath();

		// Fills in the arc. Since we set the fillStyle to have color red, it fill it red.
		context.fill();
		context.stroke();

		return canvas;
	}


	function createSlider(name){
		var slider = $("<input>");
		slider.attr("type", "range");
		slider.attr("name", name+"Range");
		slider.attr("id", name+"Range");
		slider.attr("min", 0);
		slider.attr("max",255);
		slider.attr("value", 0);
		slider.value = 0;

		var textBox = $("<input>");
		textBox.attr("name", name+"Text");
		textBox.attr("id", name+"Text");
		textBox.attr("type", "text");
		textBox.attr("value", 0);
		textBox.value = 0;

		slider.change( function(){
			$("#" + name + "Text").val(this.value);
		});

		textBox.change( function(){	
			$("#" + name + "Range").val( parseInt(this.value));
		});

		var container = $("<span></span>");
		container.addClass("slider");
		container.attr("id", name);
		container.append($("<h4>"+name+"</h4>"));
		container.append(slider);
		container.append(textBox);

		return container;
	}

	function getSliderValue(name){
		return $("#" + name + "Text:First").value;
	}

	function createSubmitButton(){
		var button = $("<br><input>");
		button.attr("type", "button");
		button.attr("value", "GO");

		return button;
	}

	function getRandomColor(){
		return Math.floor(Math.random()*16777215).toString(16);
	}

	function scoreGame(color, name1, name2, name3){
		
	}

	// function createTimer(){
	// 	var text = $("<p></p>");		
	// 	var time = 0;
	// 	text.attr("id", "timer");
	// 	text.html("0 seconds");
	// 	return this;
	// }
	// function getTime(timer){
	// 	return timer.time;
	// }

	// function update(timer){
	// 	timer.time = timer.time + 1;
	// 	$("#timer").html(timer.time + "seconds");

	// }
	var color = getRandomColor();
	this.html("");
	this.append(createCanvas(color));
	this.append(createSlider("Red"));
	this.append(createSlider("Green"));
	this.append(createSlider("Blue"));
	this.append(createSubmitButton());
	scoreGame(color, "Red", "Green", "Blue");
	
	// var timer = createTimer();
	// this.append(timer.text);
	// while(getTime(timer) < 30){
	// 	$.delay(1000).update(timer);
	// }
};

