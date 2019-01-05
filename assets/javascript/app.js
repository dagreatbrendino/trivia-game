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
var correctInd;
//Current Question Object
var display = {
    //timer is greater than 0
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
    //timer hits 0 or question has been answered
        //result (Correct or Incorrect)
        result: " ",
        //if incorrect or time ran out, correct answer is displayed
        revealedAnswer: " ",
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



//game logic that runs timer, populates display with question and answer, and allows player to submit answer
    display.disQ = question.q;
    //assign correct answer to a slot
    display.assignAnswer(question.correctAnswer);
    //assign incorrect answers to a slot
    for ( i = 0; i < 3; i++){
        display.assignAnswer(question.incorrectAnswers[i]);
    }


    $(document).ready(function () {
        //Adds question to dom
        $("#display").append("<div class='row'><div class='col'>" + display.disQ + "</div></div>");
        //Adds answers to dom
        for (j = 0; j < 4; j++){
            $("#display").append("<div class='row'><div class='col'><button>" + display.answers[j] + "</button></div></div>");
        }
       
        //question timer
            //function that will be called when the timer hits zero, it should end the users chance to answer the question and update the display
    });