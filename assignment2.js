$.fn.hexed = function(settings){



	function createSlider(name){
		var slider = $("<input>");
		slider.attr("type", "range");
		slider.attr("name", name+"Range");
		slider.attr("id", name+"Range");
		slider.attr("min", 0);
		slider.attr("max",250);
		slider.attr("value", 0);

		var textBox = $("<input>");
		textBox.attr("name", name+"Text");
		textBox.attr("id", name+"Text");
		textBox.attr("type", "text");
		textBox.attr("value", 0);

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

	this.append(createSlider("Red"));


};

