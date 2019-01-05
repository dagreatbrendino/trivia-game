//Question object that contains
var questions = [{
    //qustion
    q: "This is a question?",
    //correct answer
    correctAnswer: "This is the correct answer" ,
    //array of incorrect answers
    incorrectAnswers: ["This is 1 incorrect answer", "This is 2nd incorrect answer", "This is a 3rd incorrect answer" ]
},{
      q: "This is another question?",
      correctAnswer: "This is the still correct answer" ,
      incorrectAnswers: ["This is 1 incorrect answer", "This is 2nd incorrect answer", "This is a 3rd incorrect answer" ]
  }
]
//Player's Score
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
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
//function that assigns question
var assignQuestion = function(){
    //reset answers
    for (k = 0; k < 4; k++){
        currentQuestion.answers[k] = " ";
    }
    //picks question
    currentQuestion.disQ = questions[questionIndex].q;
    //assign correct answer to a slot
    currentQuestion.assignAnswer(questions[questionIndex].correctAnswer);
    //assign incorrect answers to a slot
    for ( i = 0; i < 3; i++){
        currentQuestion.assignAnswer(questions[questionIndex].incorrectAnswers[i]);
    }
    $("#question").empty();
    //Adds question to the dom
    $("#question").append("<div class='row'><div class='col'>" + currentQuestion.disQ + "</div></div>");

        var val = 0;
        //Adds answers to dom
        for (j = 0; j < 4; j++){
            //The correct answer is given a value of 1
            if (currentQuestion.answers[j] === questions[questionIndex].correctAnswer){
                val = 1;
                correctInd = j;
            }
            //All other answers will be given a value of 0
            else{
                val = 0;
            }
            //The answer is added to the dom as an html element
            $("#question").append("<div class='row'><div class='col'><button class='playerAns' value =" + val + ">" + currentQuestion.answers[j] + "</button></div></div>");
    }
    //resetting the timer
    currentQuestion.timeleft =10;
    $("#timer").html("<h4>" + currentQuestion.timeleft + "</h4>");
    timer();
}
//function that updates the display when the correct answer is picked, and then picks a new question after a few second
var correctAnswer = function(){
    $("#question").empty();
    $("#question").append("<div class = 'row'><div class='col'>Correct!</div></div>");
    numCorrect++;
    questionIndex++;
    clearInterval(intervalId);
    if(questionIndex < questions.length){
        setTimeout(assignQuestion, 5000);
    }
    else{
        setTimeout(gameover, 5000);
    }
}
//function that updates the display when the incorrect answer is picked, and the picks a new question after a few seconds
var incorrectAnswer = function(){
    $("#question").empty();
    $("#question").append("<div class = 'row'><div class='col'>Incorrect!</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
    numIncorrect++;
    questionIndex++;
    clearInterval(intervalId);
    if(questionIndex < questions.length){
        setTimeout(assignQuestion, 5000);
    }
    else{
        setTimeout(gameover, 5000);
    }
}
//function that updates the display when the timer reaches zero
var timeup = function(){
    $("#question").empty();
    $("#question").append("<div class = 'row'><div class='col'>Time is up!</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>The correct answer was: " + currentQuestion.answers[correctInd] + "</div></div>");
    numUnanswered++;
    questionIndex++;
    clearInterval(intervalId);
    if(questionIndex < questions.length){
        setTimeout(assignQuestion, 5000);
    }
    else{
        setTimeout(gameover, 5000);
    }
}
//function that is called when there are no more questions
var gameover = function(){
    $("#question").empty();
    $("#question").append("<div class = 'row'><div class='col'>That's all of the questions! Here's your score</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Correct Answers: " + numCorrect+ "</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Incorrect Answers: " + numIncorrect+ "</div></div>");
    $("#question").append("<div class = 'row'><div class='col'>Unanswered Questions: " + numUnanswered+ "</div></div>");
}

//timer logic
var intervalId;

function timer() {
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    currentQuestion.timeleft--;
    $("#timer").html("<h4>" + currentQuestion.timeleft + "</h4>");
    if (currentQuestion.timeleft === 0) {
        clearInterval(intervalId);
        timeup();
    }
}

//question index
var questionIndex = 0;
   
$(document).ready(function () {
    
    $("#start").on("click","button", function (){
        //Adds timer to dom
        $("#head").append("<div class='row'><div id=timer class='col'><h4>" + currentQuestion.timeleft + "</h4></div></div>");
        assignQuestion();
        $("#start").empty();
    })
    //When the player picks an answer
    $("#question").on("click", "button", function () {
        //If the answer is correct call the proper function
        if (this.value == 1) {
            console.log("correct answer picked");
            correctAnswer();
        }
        //else the answer is incorrect call the proper function
        else {
            console.log("incorrect answer picked");
            incorrectAnswer();
        }

    })

    //question timer
    //function that will be called when the timer hits zero, it should end the users chance to answer the question and update the currentQuestion
});