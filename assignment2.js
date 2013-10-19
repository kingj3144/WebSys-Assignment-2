$.fn.hexed = function(settings){

	/** Function creates a HTML Canvas and adds a circle of color
	  * @param color - the color as a hex string to make the circle
	  * @return - a jQuery object contain the created canvas
	 */
	function createCanvas(color){
		//create a blank canvas
		var canvas = $("<canvas></canvas>");
		canvas.attr("id", "canvas");
		canvas.attr("heigh", 200);
		canvas.attr("width", 200);

		var context = canvas[0].getContext("2d");
		// Set the color of the fill
		context.fillStyle="#" + color;

		// Start a new path
		context.beginPath();

		context.arc(125,75,50,0,Math.PI*2,true);

		// Close the path
		context.closePath();

		// Fills in the arc. Since we set the fillStyle to have color red, it fill it red.
		context.fill();
		context.lineWidth = 3;
		context.stroke();

		return canvas;
	}

	/** Funtion that created a slider with a title and textbox
	  * @param name - the name of the bar, will be used to make unique id tags
	  * @returns - jQuery object containing a span with a title, slider and textbox
	  */
	function createSlider(name){
		//Create the slider
		var slider = $("<input>");
		slider.attr("type", "range");
		slider.attr("name", name+"Range");
		slider.attr("id", name+"Range");
		slider.attr("min", 0);
		slider.attr("max",255);
		slider.attr("value", 0);
		slider.value = 0;

		//Create the text box
		var textBox = $("<input>");
		textBox.attr("name", name+"Text");
		textBox.attr("id", name+"Text");
		textBox.attr("type", "text");
		textBox.attr("value", 0);
		textBox.value = 0;

		//Link the slider to the textbox
		slider.change( function(){
			$("#" + name + "Text").val(this.value);
		});

		//Link the text box to the slider
		textBox.change( function(){	
			$("#" + name + "Range").val( parseInt(this.value));
		});

		//Create a span to contain the slider and textbox
		var container = $("<span></span>");
		container.addClass("slider");
		container.attr("id", name);
		container.append($("<h4>"+name+"</h4>"));
		container.append(slider);
		container.append(textBox);

		//retrun the container with the slider and the text box
		return container;
	}

	/** Function to get the value of a slider based on the name
	  * @param - The name of the slider
	  * @return - The value of the slider
	  */
	function getSliderValue(name){
		return $("#" + name + "Text")[0].value;
	}

	/** Funtion to create the submit button
	  * @return a jQuery object with a submit button
	  */
	function createSubmitButton(){
		var button = $("<br><input>");
		button.attr("type", "button");
		button.attr("value", "GO");

		button.click( function(){
			scoreGame(color, "Red", "Green", "Blue");
		});

		return button;
	}

	/** Function to create an empty area for the scores to go
	  * @return - jQuery object with a <div> for the scoreboard
	  */
	function createScoreBoard(){
		var scoreBoard = $("<div></div>");
		scoreBoard.attr("id", "scoreBoard");

		return scoreBoard;
	}

	/** Function to generate a random 6 digit hex value
	  * @return - a 6 digit hex value
	  */
	function getRandomColor(){
		return Math.floor(Math.random()*16777215).toString(16);
	}

	function scoreGame(color, name1, name2, name3){
		var score = scoreHelper(color.substring(0, 2), getSliderValue(name1)) + 
					scoreHelper(color.substring(2, 4), getSliderValue(name2)) + 
					scoreHelper(color.substring(4, 6), getSliderValue(name3));
		console.debug(score);
		addScore(score);
	}

	function scoreHelper(desired, actual){
		if(desired == undefined || actual == undefined){
			console.debug("Something is wrong");
		}
		var score = (parseInt(desired, 16) - actual.valueOf())/255 * 100;
		console.debug(score);
		return score;
	}

	function addScore(score, color){
		var scoreBoard = $("#scoreBoard");
		var scoreElement =$("<span></span><br>");
		scoreElement.css("background: "+ color);
		scoreElement.html(score);

		scoreBoard.append(scoreElement);
	}

	//Get a random hex color
	var color = getRandomColor();

	//Clear any existing html out of the game object
	this.html("");

	//Added the needed elements for the game
	this.append(createCanvas(color));
	this.append(createSlider("Red"));
	this.append(createSlider("Green"));
	this.append(createSlider("Blue"));
	this.append(createSubmitButton());
	this.append(createScoreBoard());
	

};