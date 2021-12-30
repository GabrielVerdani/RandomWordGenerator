const result = document.querySelector("#result");
const button = document.querySelector("#button");
const charactersInput = document.querySelector("#characters");
const charactersDisplay = document.querySelector("#charactersDisplay");

let wordLength = charactersInput.value;
charactersInput.addEventListener("input", () => {
  wordLength = charactersInput.value;
  charactersDisplay.textContent = wordLength;
});

button.addEventListener("click", () => {
  let word = generateNewWord(wordLength);
  result.textContent = word;
});

const generateNewWord = (wordLength) => {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "l",
    "m",
    "n",
    "o",
    "p",
    "r",
    "s",
    "t",
    "u",
    "v",
    "x",
    "z",
  ];
  const vowels = ["a", "e", "i", "o", "u"];

  const getRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  let finalWord = [];

  let i = 0;
  while (i < wordLength) {
    let lastLetter = finalWord[i - 1];
    let secondToLastLetter = finalWord[i - 1];

    // Primeira letra pode ser qualquer letra do alfabeto;
    if (i == 0) {
      let letter = getRandom(alphabet);
      finalWord.push(letter);
    }

    // Ultima letra
    else if (i == wordLength - 1) {
      if (!vowels.includes(lastLetter)) {
        // Ultima letra pode ser S se suceder R;
        if (lastLetter == "r" && vowels.includes(secondToLastLetter)) {
          let possibleLastLetters = ["a", "e", "o", "s"];
          let letter = getRandom(possibleLastLetters);
          finalWord.push(letter);
        }
        // Ultima letra pode ser uma vogal;
        else {
          let possibleLastLetters = ["a", "e", "o"];
          let letter = getRandom(possibleLastLetters);
          finalWord.push(letter);
        }
      }

      // Ultima letra pode ser [l, m, r, s, z] se suceder uma vogal;
      else {
        let possibleLastLetters = ["l", "m", "r", "s", "z"];
        let letter = getRandom(possibleLastLetters);
        finalWord.push(letter);
        console.log(letter);
      }
    }

    // Letra anterior é consoante
    else if (!vowels.includes(lastLetter)) {
      let beforeRorL = ["b", "c", "d", "f", "g", "p", "t", "v"];

      // Se L suceder uma vogal, pode ser sucedido por uma consoante, exceto ela mesma
      if (lastLetter == "l" && vowels.includes(secondToLastLetter)) {
        let possibleLetters = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "m",
          "n",
          "o",
          "p",
          "r",
          "s",
          "t",
          "u",
          "v",
          "x",
          "z",
        ];
        let letter = getRandom(possibleLetters);
        finalWord.push(letter);
      } else if (lastLetter == "r" && vowels.includes(secondToLastLetter)) {
        let possibleLetters = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "l",
          "m",
          "n",
          "o",
          "p",
          "s",
          "t",
          "u",
          "v",
          "x",
          "z",
        ];
        let letter = getRandom(possibleLetters);
        finalWord.push(letter);
      }

      // Consoante R pode suceder outro R, apenas duas vezes seguidas;
      else if (lastLetter == "r" && secondToLastLetter != "r") {
        let possibleLetters = ["a", "e", "i", "o", "u", "r"];
        let letter = getRandom(possibleLetters);
        finalWord.push(letter);
      }
      // Consoantes R e L podem suceder as consoantes: B C D F G P T V;
      else if (beforeRorL.includes(lastLetter)) {
        let possibleLetters = ["r", "l", "a", "e", "i", "o", "u"];
        let letter = getRandom(possibleLetters);
        finalWord.push(letter);
      } else {
        let letter = getRandom(vowels);
        finalWord.push(letter);
      }
    }

    // Letra anterior é vogal
    else if (vowels.includes(lastLetter)) {
      // Uma vogal não pode suceder duas vogais seguidas
      if (vowels.includes(secondToLastLetter)) {
        let possibleLetters = [
          "b",
          "c",
          "d",
          "f",
          "g",
          "h",
          "j",
          "l",
          "m",
          "n",
          "p",
          "r",
          "s",
          "t",
          "v",
          "x",
          "z",
        ];
        let letter = getRandom(possibleLetters);
        finalWord.push(letter);
      }
      // Uma vogal pode suceder qualquer outra letra, mas não pode se repetir;
      else {
        let looping = true;
        while (looping) {
          let letter = getRandom(vowels);
          if (lastLetter != letter) {
            looping = false;
            finalWord.push(letter);
          }
        }
      }
    } else {
      let letter = getRandom(alphabet);
      finalWord.push(letter);
    }

    i++;
  }

  finalWord = finalWord.join("");
  return finalWord;
};
