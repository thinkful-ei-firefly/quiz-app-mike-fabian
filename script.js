'use strict';
console.log(questions);



function firstLoad(){
  $('.main').html(`<h2>Welcome</h2>
  		<button class="startButton">Start</button>`);
}



/**
 * Take question from data.js
 * Use .html() to place it on the DOM
 * 
 */
function loadQuestion(numberQuestion){
  console.log(numberQuestion);
  console.log(questions[numberQuestion]);
  $('.main').html(`<form action="#" method="post">
  <img src="${questions[numberQuestion]['img']}">
  <progress value="${numberQuestion + 1}" max="10"></progress>
  <p class="progressText">Progress: ${numberQuestion + 1}/10</p>
  <h2>${questions[numberQuestion]['question']}</h2>
  <input id="option1" type="radio" name="option" value="${questions[numberQuestion]['options'][0]}">${questions[numberQuestion]['options'][0]}</input>
  <input id="option2" type="radio" name="option" value="${questions[numberQuestion]['options'][1]}">${questions[numberQuestion]['options'][1]}</input>
  <input type="radio" name="option" value="${questions[numberQuestion]['options'][2]}">${questions[numberQuestion]['options'][2]}</input>
  <input type="radio" name="option" value="${questions[numberQuestion]['options'][3]}">${questions[numberQuestion]['options'][3]}</input>
  <button type="submit" class="submitButton">Submit</button>
  </form>`);
}

function buttonActions(){
  let currentQuestion = 0;
  let totalRight = 0;
  let totalWrong = 0;
  $('.main').on('click', '.startButton', event => {
    $(loadQuestion(currentQuestion));
  });

  $('.main').on('click', '.nextButton', event => {
    if (currentQuestion < 9) {
      currentQuestion++;
      $(loadQuestion(currentQuestion));
    } else {
      $('.main').html(`
      <h1>You're done!</h1>
      <p>Right: ${totalRight}</p>
      <p>Wrong: ${totalWrong}</p>
      <button class="playAgainButton">Play again?</button>
      `);
    }
  });
  
  $('.main').on('click', '.playAgainButton', event => {
    currentQuestion = 0;
    totalRight = 0;
    totalWrong = 0;
    firstLoad();
  });

  $('.main').on('click', '.submitButton', event => {
    event.preventDefault();
    let answerChecked = $('input[name=option]:checked').val();
    if (answerChecked) {
      if (questions[currentQuestion]['answer'] === answerChecked){
        totalRight++;
        showRightAnswer(totalRight, totalWrong);
      }else{
        totalWrong++;
        showWrongAnswer(totalRight, totalWrong, questions[currentQuestion]['answer']);
      }
    } else {
      alert('Must select an option!');
    }
  });

  
}

function showRightAnswer(totalRight, totalWrong){
  $('.main').html(`<h4>You did a good job</h4>
    <p>Score:</p>
    <p>Right: ${totalRight}</p>
    <p>Wrong: ${totalWrong}</p>
    <button class="nextButton">Next</button>`);
}

function showWrongAnswer(totalRight, totalWrong, answer){
  $('.main').html(`<h4>Oh no! You chose the wrong answer</h4>
    <p>The correct Answer is: ${answer}</p>
    <p>Score:</p>
    <p>Right: ${totalRight}</p>
    <p>Wrong: ${totalWrong}</p>
    <button class="nextButton">Next</button>`);
}




/*$('.main').html(`<h4>You did a good job</h4>
    <p>Score:</p>
    <p>Right: 4</p>
    <p>Wrong: 3</p>
    <button class="nextButton">Next</button>`);*/


$(firstLoad);
$(buttonActions);
//$(loadQuestion(0));



// `<form action="#" method="post">
// <img src="https://static.boredpanda.com/blog/wp-content/uploads/2016/11/cute-baby-seal-waves-photographer-alexey-trofimov-russia-fb__700-png.jpg" alt="a beautiful baby seal">
// <progress value="3" max="5"></progress>
// <h2>Question 1</h2>
// <label for="option1">A</label>
// <input id="option1" type="radio" name="option" value="Option 1">Option</input>
// <label for="option2">A</label>
// <input id="option2" type="radio" name="option" value="Option 2">Option2</input>
// <input type="radio" name="option" value="Option 3">Option3</input>
// <input type="radio" name="option" value="Option 4">Option4</input>
// <button>Submit</button>
// </form>`