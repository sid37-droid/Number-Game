let getRandomNumberBtn = document.getElementById("btn1");
let postTheNumber = document.getElementById("btn2");
let output = document.getElementById("outputText");
let input = document.getElementById("userInput");
let restartBtn = document.getElementById("btn3");
let slider = document.getElementById("slider");
let guessText = document.getElementById("guessText");
let containerTwo = document.getElementById("container2");

let randomNumber;
let counter = 0;
let failCounter = 0;
let sliderValue = 100;

let btn1GetANumber = "ПОЛУЧИТЬ ЧИСЛО";
let btn2Generate = "СГЕНЕРИРУЙТЕ ЧИСЛО";
let btn2GenerateANewNumber = "СГЕНЕРИРУЙТЕ НОВОЕ ЧИСЛО";
let congratsText = "Congratulation! Вы угадали!";
//let from1ToSliderValue = `Введите число от 1 до ${sliderValue}`;
let biggerNumber = "Уже почти! Ваше число чуть больше загаданного";
let smallerNumber = "Уже почти! Ваше число чуть меньше загаданного";
let guessTheNumber = "УГАДАЙТЕ ЧИСЛО";
let sendText = "Отправить";
let enterANumber = "Введите целое число";
let even = "Число чётное. Попробуйте ещё раз";
let odd = "Число нечётное. Попробуйте ещё раз";

// Проверка числа (чётное или нечётное)
function isEven(n) {
   return n % 2 == 0;
}

// Функция срабатывающая каждую 3ю попытку
function failToGuess() {
   // проигрыш с 3й попытки
   if (failCounter > 1) {
      failCounter = 0;
      isEven(randomNumber) ? (output.innerText = even) : (output.innerText = odd);
      checkForInputValue();
   } else {
      failCounter++;
      checkForInputValue();
   }
}

// Получение рандомного числа
function getRandomNumber() {
   counter = 0;
   failCounter = 0;
   randomNumber = Math.floor(Math.random() * sliderValue) + 1;
   getRandomNumberBtn.innerText = guessTheNumber;
   getRandomNumberBtn.disabled = true;
   postTheNumber.innerText = sendText;
   restartBtn.disabled = false;
   output.innerHTML = enterANumber;
   input.disabled = false;
   containerTwo.style.display = "none";
   console.log(randomNumber);
   input.style.display = 'block';
   postTheNumber.style.display = 'block';
   restartBtn.style.display = 'block';
   return randomNumber;
}

// Отправка числа
postTheNumber.addEventListener("click", function () {
   let numberInput = Math.floor(Number(input.value));
   let victory;
   // Если число угадали
   if (numberInput == randomNumber) {
      input.value = "";
      counter++;
      getRandomNumberBtn.innerText = btn1GetANumber;
      postTheNumber.innerText = btn2GenerateANewNumber;
      output.innerText = `${congratsText} Это была ваша ${counter} попытка`;
      postTheNumber.disabled = true;
      getRandomNumberBtn.disabled = false;
      victory = "victory";
      restartBtn.disabled = true;
      containerTwo.style.display = "block";
      input.style.display = 'none';
      postTheNumber.style.display = 'none';
   } else if (numberInput > sliderValue || numberInput == 0) {
      output.innerText = `Введите число от 1 до ${sliderValue}`;
      input.value = "";
      failToGuess();
   }
   // Если число больше
   else if (numberInput > randomNumber) {
      output.innerText = biggerNumber;
      input.value = "";
      failToGuess();
   } // Если число меньше
   else if (numberInput < randomNumber) {
      output.innerText = smallerNumber;
      input.value = "";
      failToGuess();
   }
   if (victory === "victory") {
   } else {
      counter++;
      // console.log(counter);
   }
});

// Рестарт игры
restartBtn.addEventListener("click", () => {
   randomNumber = "";
   input.value = "";
   failCounter = 0;
   getRandomNumberBtn.innerText = btn2Generate;
   getRandomNumberBtn.disabled = false;
   postTheNumber.disabled = true;
   output.innerHTML = "";
   restartBtn.disabled = true;
   containerTwo.style.display = "block";
   input.style.display = 'none';
   postTheNumber.style.display = 'none';
   restartBtn.style.display = 'none';
});

getRandomNumberBtn.addEventListener("click", getRandomNumber);

// Ввод числа
input.addEventListener("keyup", () => {
   console.log(input.value);
   if (input.value) {
      postTheNumber.disabled = false;
   } else {
      postTheNumber.disabled = true;
   }
});

function checkForInputValue() {
   if (input.value) {
      postTheNumber.disabled = false;
   } else {
      postTheNumber.disabled = true;
   }
}

slider.addEventListener("change", () => {
   // console.log(slider.value)
   sliderValue = slider.value;
   console.log(sliderValue);
   guessText.innerText = `Угадайте число от 1 до ${sliderValue}`;
   return sliderValue;
});
