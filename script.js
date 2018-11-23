
// Game reset

var cards = Array.from(document.querySelectorAll('#container section'));
var playingField = document.getElementById('container');
var innerCards = Array.from(document.querySelectorAll('section .inner'));
var count;

function resetGame(){
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }
  for (var i = 0; i < innerCards.length; i++){
    innerCards[i].classList.remove('inner-rotate');
    innerCards[i].classList.remove('success');
    innerCards[i].classList.remove('failure');  
  }
  var newCards = Array.prototype.slice.call(cards);
    newCards.sort(compareRandom);  
  for (var i = 0; i < cards.length; i++){
    playingField.removeChild(cards[i]);
  }
  for (var i = 0; i < newCards.length; i++){
    playingField.appendChild(newCards[i]);
  }
  count = 0;
  document.querySelector('#pop_up h2').innerHTML = '';
  document.getElementById('pop_up').classList.remove('show_pop_up');
};

resetGame(); 

// Result cheker

function turnCount(){
  var checks = document.querySelectorAll('.inner-rotate');
  if (checks.length < 2){
    return false;
  } else {
    return true;
  }
} 

function resultChecker(){
  var checks = document.querySelectorAll('.inner-rotate');
  if (checks.length < 2){
    return
  } else if (checks[0].innerText == checks[1].innerText){
    checks[0].classList.add('success');
    checks[0].classList.remove('inner-rotate');
    checks[1].classList.add('success');
    checks[1].classList.remove('inner-rotate');
  } else {
    checks[0].classList.add('failure');
    checks[0].classList.remove('inner-rotate');
    checks[1].classList.add('failure');
    checks[1].classList.remove('inner-rotate');

  }
}


// Click listener


playingField.addEventListener('click', function(event){
  var target = event.target.parentElement;
  if (target.classList.contains('inner') && !target.classList.contains('inner-rotate' && 'success' && 'failure')){
    target.classList.add('inner-rotate');
    var failures = document.querySelectorAll('.failure');
    if (failures.length == 2){
      failures[0].classList.remove('failure');
      failures[1].classList.remove('failure');
    }else if (turnCount) {
      resultChecker();
    }
    if (count == 0){
      count += 1;
      var timer = document.getElementById('timer');
      timer.classList.add('timer_show');
      time(timer);
    }
  } else if (target.classList.contains('inner') && !turnCount()){
    resultChecker();
  }
  if (document.querySelectorAll('.success').length == 12){
    win();
  }
})

document.querySelector('#pop_up button').addEventListener('click', function(event){
  resetGame();
})

// timer
function time (timer){
  timer.innerHTML = '01:00'
  var timeLeft = 60;
  var timeInterval = setInterval(function(){
    if (document.querySelectorAll('.success').length == 12){
      clearInterval(timeInterval);      
    }
    if (timeLeft > 10){
      timeLeft -= 1;
      timer.innerHTML = '00:' + timeLeft;
    } else if (timeLeft > 0){
      timeLeft -= 1;
      timer.innerHTML = '00:0' + timeLeft;
    } else {
      lose();
      clearInterval(timeInterval);
    }
  }, 1000)
}

// Win Lose

function win(){
  document.getElementById('pop_up').classList.add('show_pop_up');
  document.getElementById('timer').classList.remove('timer_show');
  document.querySelector('#pop_up h2').innerHTML = '<span>W</span><span>i</span><span>n</span>';
}

function lose(){
  document.getElementById('pop_up').classList.add('show_pop_up');
  document.getElementById('timer').classList.remove('timer_show');
  document.querySelector('#pop_up h2').innerHTML = '<span>L</span><span>o</span><span>s</span><span>e</span>';
  for (var i = 0; i < innerCards.length; i++){
  	if (!innerCards[i].classList.contains('inner-rotate' && 'failure' && 'success')){
  		innerCards[i].classList.add('inner-rotate');
  	}
  }
}