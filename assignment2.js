$.fn.hexed = function(settings){



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

	function createTimer(){
		var text = $("<p></p>");		
		var time = 0;
		text.attr("id", "timer");
		text.html("0 seconds");
		return this;
	}
	function getTime(timer){
		return timer.time;
	}

	function update(timer){
		timer.time = timer.time + 1;
		$("#timer").html(timer.time + "seconds");

	}

	this.append(createSlider("Red"));
	this.append(createSlider("Green"));
	this.append(createSlider("Blue"));
	this.append(createSubmitButton());
	
	var timer = createTimer();
	this.append(timer.text);
	while(getTime(timer) < 30){
		$.delay(1000).update(timer);
	}
};

