const frontPage = document.getElementById('frontPage');
const title = document.getElementById('title');
const button = document.getElementById('button');
const mainPage = document.getElementById('mainPage');
const timer = document.getElementById('timer');
const Q = document.getElementById('Q');
const A = document.getElementById('A');



//================== START button ==================
button.addEventListener("click", () => {
  frontPage.style.display = 'none';
  mainPage.style.display = 'block';

  //timer start
  timer.innerHTML = countDown();
  //show Question
  showQuestion();
  });

//================== COUNT DOWN TIMER ==================
let timeLeft= 30;
let startTime;

//count down timer function
function countDown () {
  timer.innerText = timeLeft;
  startTime = new Date();

  const intervalID = setInterval (() => {
    timer.innerText = timeLeft - getOneSec(); //count down 

    if (timer.innerText == 0) {  //when time ran out, "game over"
      timeup(); 
      clearInterval(intervalID);
    } 
  },1000);
}

//This getOneSec function is called 1 sec after the setinterval
//Ex. this new Date is 15:00:01 and startTime is 15:00:00. 
// divide the 1 sec by 1000 millisec. get 1 sec.

function getOneSec() {
  return Math.floor((new Date() - startTime) / 1000);
}

//When time is up, "game over"
function timeup () {
  frontPage.style.display = 'flex';
  mainPage.style.display = 'none';
  title.innerHTML = 'GAME OVER';
  title.style.color = 'red';
  button.innerHTML = 'TRY AGAIN';
  // button.style.color = 'black';
}

//================ GET RANDOM SENTENCE AND DISPLAY ================
// get random sentence
function getRandomSentence() {
  let sentenceIndex = Math.floor(Math.random() * sentence.length); //get random index
  let randomSentence = sentence[sentenceIndex]; //randam sentence
  return randomSentence;
}

//call random sentence and display
function showQuestion () {
  const qsentence = getRandomSentence();
  Q.innerText = '';
  let letter = qsentence.split(""); //get each letter in array
  // console.log(letter);
  letter.forEach((character) => {
    //create span tag(same amount of the letter)
    const characterSpan = document.createElement('span');
    //embed the each letter to the span tag
    characterSpan.innerText = character; 
    Q.appendChild(characterSpan); 
  });

  //clear input box
  A.value = '';
  
  countDown();
}

//================== Input JUDGE(PASS/FAIL) ==================

  A.addEventListener('input', () => {
    const letterArray = Q.querySelectorAll('span');
    // console.log(letterArray);
    const inputValue = A.value.split(''); //get each typed letter
    console.log(inputValue);
  
    let match = true;
    letterArray.forEach((characterSpan, index) => {
      //in the beginning(nothing typed)
      if(inputValue[index] == null) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        match = false; 
      } //if correct
      else if(characterSpan.innerText == inputValue[index]) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
      } //if incorrect
      else {
        characterSpan.classList.add('incorrect');
        characterSpan.classList.remove('correct');
        // match = false;
      }
    }) ;
  
    if(match == true) {
      showQuestion();
    }
  });