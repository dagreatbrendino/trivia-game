//Question object that contains
var question = {
    //qustion
    q: "This is a question?",
    //correct answer
    correctAnswer: "This is the correct answer" ,
    //array of incorrect answers
    incorrectAnswers: ["This is 1 incorrect answer", "This is 2nd incorrect answer", "This is a 3rd incorrect answer" ]
}
//index of correct answer
var correctInd =0;
//Current Question Object
var currentQuestion = {
    //question
    disQ: " ",
    //array of answers
    answers: [
        //answer 1
        " ",
        //answer 2
        " ",
        //answer 3
        " ",
        //answer 4
        " "
    ],
    //timer
    timeleft: 10,
    //source of fun gif or pic
    funGif: " ",
    //Assign answer to answers array
    assignAnswer: function (ans){
        //pick a random number 0-3
        var index = Math.floor(Math.random()* 4);
        //if there is no answer in the slot 
        if (this.answers[index] === " "){
            this.answers[index] = ans;
        }
        else{
            this.assignAnswer(ans);
        }
    }
}
//function that updates the display when the correct answer is picked, and then picks a new question after a few second
var correctAnswer = function(){
    $("#display").empty();
    $("#display").append("<div class = 'row'><div class='col'>Correct!</div></div>");
}
//function that updates the display when the incorrect answer is picked, and the picks a new question after a few seconds
var incorrectAnswer = function(){
    $("#display").empty();
    $("#display").append("<div class = 'row'><div class='col'>Incorrect!</div></div>");
    $("#display").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
}
//function that updates the display when the timer reaches zero
var timeup = function(){
    $("#display").empty();
    $("#display").append("<div class = 'row'><div class='col'>Time is up!</div></div>");
    $("#display").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
}

//game logic that runs timer, populates display with question and answer, and allows player to submit answer
    var intervalId;
    function timer() {
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        currentQuestion.timeleft--;
        $("#timer").html("<h4>" + currentQuestion.timeleft + "</h4>");
        if (currentQuestion.timeleft === 0){
            clearInterval(intervalId);
            timeup();
        }
    }
    currentQuestion.disQ = question.q;
    //assign correct answer to a slot
    currentQuestion.assignAnswer(question.correctAnswer);
    //assign incorrect answers to a slot
    for ( i = 0; i < 3; i++){
        currentQuestion.assignAnswer(question.incorrectAnswers[i]);
    }

    $(document).ready(function () {
        //Adds timer to dom
        $("#display").append("<div class='row'><div id=timer class='col'><h4>" + currentQuestion.timeleft + "</h4></div></div>");
        //Adds question to dom
        $("#display").append("<div class='row'><div class='col'>" + currentQuestion.disQ + "</div></div>");

        var val = 0;
        //Adds answers to dom
        for (j = 0; j < 4; j++){
            //The correct answer is given a value of 1
            if (currentQuestion.answers[j] === question.correctAnswer){
                val = 1;
                correctInd = j;
            }
            else{
                val = 0;
            }
            $("#display").append("<div class='row'><div class='col'><button class='playerAns' value =" + val + ">" + currentQuestion.answers[j] + "</button></div></div>");
        }
        //When the player picks an answer
        $(".playerAns").on("click", function(){
            //If the answer is correct call the proper function
            if(this.value ==1){
                console.log("correct answer picked");
                correctAnswer();
            }
            //else the answer is incorrect call the proper function
            else{
                console.log("incorrect answer picked");
                incorrectAnswer();
            }
        
        })
        //question timer
        timer();
            //function that will be called when the timer hits zero, it should end the users chance to answer the question and update the currentQuestion
    });