$.fn.hexed = function(settings){

	var difficulty = settings.difficulty;
	var startTime;
	var checkClick = 0;
	var turns = settings.turns;
	var color;
	var game = this;

	/** Function creates a HTML Canvas and adds a circle of color
	  * @param color - the color as a hex string to make the circle
	  * @return - a jQuery object contain the created canvas
	 */
	function createSwatch(color){
        //create the color swatch
        var swatch = $(" <div id=\"swatch\" class=\"ui-widget-content ui-corner-all\"></div>")
        swatch.css( "background-color", "#" + color );
        swatch.css("margin-left", "auto");
        swatch.css("margin-right", "auto");
        return swatch;
	}

	function colorSwatch(color){
        //create the color swatch
        $("#swatch").css( "background-color", "#" + color );
         $("#swatch").css("margin-left", "auto");
         $("#swatch").css("margin-right", "auto");
	}

	/** Funtion that created a slider with a title and textbox
	  * @param name - the name of the bar, will be used to make unique id tags
	  * @returns - jQuery object containing a span with a title, slider and textbox
	  */
	function createSlider(name){
       //Create the slider
        $(name+"Range").slider({
          range: "min",
          value: 1,
          step: 1,
          min: 0,
          max: 255,
          slide: function( event, ui ) {
            $(name+"Text").val( ui.value.toString(16).toUpperCase() );             
          }
        });

        //Link the text box to the slider
        $(name+"Text").change(function () {
            $(name+"Range").slider("value", parseInt(this.value));
        }); 

        //Show the text box
        $(name+"Text").css("visibility","visible");

        //start the text box at zero
        $(name+"Text").val(0);
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
		var button = $("<input>");
		button.attr("id", "submitButton");
		button.attr("type", "button");
		button.attr("value", "Got it!");
        //the if statement makes sure that the user starts the game before they submit any 
		  //answer to the test. 
		button.click(endTurn);

		return  (button);
	}
	/** Funtion to create the start button
	  * @return a jQuery object with a start button
	  */
	function createStartButton(){
		var button = $("<input>");
		button.attr("type", "button");
		button.attr("value", "Start");

		button.click( function(){
			checkClick = 1;
			init();
			startTime = (new Date()).getTime();
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
		//var score = (Math.abs(scoreHelper(color.substring(0, 2), getSliderValue(name1))) + 
		//			Math.abs(scoreHelper(color.substring(2, 4), getSliderValue(name2))) + 
		//			Math.abs(scoreHelper(color.substring(4, 6), getSliderValue(name3))))/3;
		var score = (scoreHelper(color.substring(0, 2), parseInt(getSliderValue(name1), 16)) + 
					scoreHelper(color.substring(2, 4), parseInt(getSliderValue(name2), 16)) + 
					scoreHelper(color.substring(4, 6), parseInt(getSliderValue(name3), 16)))/3;
		
		console.debug(score);
		score = ((15 - difficulty - score)/(15 - difficulty))*(15000 - (startTime - (new Date()).getTime()));
		console.debug(score);
		if (score < 0) {
			score = 0;
		}

        var userColor = getSliderValue(name1)+getSliderValue(name2)+getSliderValue(name3);
		addScore(Math.round(score), userColor);
	}

	function scoreHelper(desired, actual){
		if(desired == undefined || actual == undefined){
			console.debug("Something is wrong");
		}
		var score = ((parseInt(desired, 16) - (parseInt(actual, 16)))/255) * 100;
		
		// console.debug(score);
		return score;
	}

	function addScore(score, color){
		var scoreBoard = $("#scoreBoard");
		var scoreElement =$("<span></span><br>");
		scoreElement.css("background-color", "#" + color);
		scoreElement.css("width", "200px");
		scoreElement.css("boader-style", "solid");
		scoreElement.html(score);

		scoreBoard.append(scoreElement);
	}

	function init(){
		//Get a random hex color
		color = getRandomColor();

		//Clear any existing html out of the game object
		game.html("");
		//Added the needed elements for the game
		$("#turns-left").append("You have " + turns + " turns left!");
	    game.append(createSwatch(color));
	    game.append(createSlider("#Red"));
	    game.append(createSlider("#Green"));
	    game.append(createSlider("#Blue"));
		$("#go-score").append(createSubmitButton());
		$("#go-score").append(createScoreBoard());	
	}

	/** Function called when the user is ready to end their turn
	  */
	function endTurn(){
		//Check to see if its the end of turn
		if (checkClick != 0 && turns > 0){
			//scoreGame(color, "Red", "Green", "Blue");
			scoreGame(color, "Red", "Green", "Blue");
			turns -= 1;
			checkClick = 0;
			console.debug($("#submitButton"));
			$("#submitButton").attr("value", "Next");
			console.debug($("#submitButton"));
			$("#turns-left").text("You have " + turns + " turns left!");
		//check to see if the users is ready for their next turn
		} else if (turns >0){
			checkClick = 1;
			playTurn();
			$("#submitButton").attr("value", "Got It!");

		//Else the game is over
		} else {
			alert("GAME OVER");
		}
	}

	function playTurn(){
		startTime = (new Date()).getTime();
		color = getRandomColor();
		colorSwatch(color);
	}

	//Clear any existing html out of the game object
	this.html("");
	//Added the needed elements for the game
	this.append(createStartButton());

};
