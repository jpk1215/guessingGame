// set variables 
var prevGuessses = [];
var guessesLeft = 5;


// gerate a random number and set it as ans
randomNumber();


// function to generate a random number
function randomNumber() {

  ans = Math.round(Math.random()*100)

  if (ans >= 1){
    return ans;
  }

  else {
    return randomNumber();
  }
}


// function to call out the temperature of the guess
function hotCold(guess) {

  var diff = Math.abs(ans - guess);

  if (diff < 4) {
    return "On Fire";
  }
  else if (diff < 8) {
    return "Hot";
  }
  else if (diff < 15) {
    return "Warm";
  }
  else if (diff < 25) {
    return "Cool";
  }
  else if (diff < 35) {
    return "Cold";
  }
  else {
    return "Freezing";
  }
}


// function to call oput if the guess is higher or lower than the answer
function highLow(guess) {

  if (guess > ans) {
    return "High";
  }
  else if (guess < ans) {
    return "Low";
  }
}


// function to compare guess to previous guess and call out "hotter" or "colder"
function hotterColder(guess) {

  var prev = prevGuessses[prevGuessses.length - 2];

  if (prevGuessses.length === 1) {
    return '';
  }

  else if (Math.abs(ans - prev) > Math.abs(ans - guess)) {
   return "Hotter";
  }

  else {
    return "Colder";
  }
}


// function to return a string with the hot or cold, high or low, and hotter or colder
function guessFeedback(guess) {

  var feedback = "";
  
  feedback = guess + " is " + hotCold(guess) + ", " + hotterColder(guess) + 
  " and it's too " + highLow(guess) + ". You have " + guessesLeft + " guesses remaining.";
  
  return feedback
}


// a function to display the guess feedback on the user interface
function recordGuess(guess) {

    $("#guessList").append('<ol>' + guessFeedback(guess) + '</ol>')
}


// jQuery to take input from the field and provide feedback for the user guess
// second chunk is to be able to submit with both enter and the submit button
$(document).ready( function() {

  $("#field").keypress(function(e) {
    if (e.which == 13) {
    
      event.preventDefault();

      var guess = $("#field").val();

      if (guess == ans) {
        $(".container").css({"background-color": "#0f0"})
        $("#guessList").append('<h1>' + ans + ' is correct!!</h1>')
      }

      else if (prevGuessses.indexOf(guess) > -1) {
        $("#guessList").append('<p>No Repeated Guesses!</p>');
        $("#field").val("");
        return false;
      }

      else if (guess > 0 && guess < 101) {
        prevGuessses.push(guess);
        if (guessesLeft == 0) {
          return $("#guessList").append("<h1><strong>GAME OVER!!!</strong></h1>")
        }
        guessesLeft--;
        recordGuess(guess);
        $("#field").val("");
        return false;
      }

      else if (guess.length === 0) {
        $("#guessList").append('<ol> please enter a valid number</ol>');
        $("#field").val("");
      }

      else {
        $("#guessList").append('<ol> please enter a valid number</ol>');
        $("#field").val("");
      }
    }
  });

  $("#submit").on("click", function () {
    guess = $("#field").val();

    event.preventDefault();

    var guess = $("#field").val();

    if (guess == ans) {
      $(".container").css({"background-color": "#0f0"})
      $("#guessList").append('<h1>' + ans + ' is correct!!</h1>')
    }

    else if (prevGuessses.indexOf(guess) > -1) {
      $("#guessList").append('<p>No Repeated Guesses!</p>');
      $("#field").val("");
      return false;
    }

    else if (guess > 0 && guess < 101) {
      prevGuessses.push(guess);
      if (guessesLeft == 0) {
        return $("#guessList").append("<h1><strong>GAME OVER!!!</strong></h1>")
      }
      guessesLeft--;
      recordGuess(guess);
      $("#field").val("");
      return false;
    }

    else if (guess.length === 0) {
      $("#guessList").append('<ol> please enter a valid number</ol>');
      $("#field").val("");
    }

    else {
      $("#guessList").append('<ol> please enter a valid number</ol>');
      $("#field").val("");
    }
  });

  $("#hint").on("click", function () {
    
    event.preventDefault()
    $("#guessList").append('<h2>the answer is <strong>'+ ans + '</strong></h2>')
  });

  $("#reset").on("click", function () {
  });
});




