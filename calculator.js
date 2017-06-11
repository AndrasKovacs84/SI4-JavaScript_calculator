var keys = document.getElementById("keys").getElementsByTagName("span");
var inputSequence = "";
const operators = ["+", "-", "X", "/", "%"];

for (var i=0; i < keys.length; i++) {
    keys[i].addEventListener("click", activated);
}


function activated() {
    var screen = document.getElementById("screen");
    var numbers = document.getElementsByClassName("number");
    var button = this.innerHTML;
    var lastChar = inputSequence.slice(-1);

    if (this.id === "clear"){
        inputSequence = "";
        screen.innerHTML = inputSequence;    
    } else if (this.id === "backspace") {
        inputSequence = inputSequence.slice(0,-1);
        screen.innerHTML = inputSequence;
    } else if (this.className === "number") {
        if (inputSequence.slice(-1) === ")") {
            inputSequence += "X" + this.innerHTML;    
        } else {
            inputSequence += this.innerHTML;
        }
        screen.innerHTML = inputSequence;
    } else if (this.className === "operator") {
        if (!operators.includes(lastChar) && inputSequence === "" && this.innerHTML === "-") {
            inputSequence += this.innerHTML;
        } else if (lastChar === ",") {
            inputSequence = inputSequence.slice(0,-1);
            inputSequence += this.innerHTML;
        } else if (!operators.includes(lastChar) && inputSequence !== "") {
            alert(lastChar);
            inputSequence += this.innerHTML;
        }
        screen.innerHTML = inputSequence;
    } else if (this.id === "decimal") {
        inputSequence = handleDecimal(inputSequence);
        screen.innerHTML = inputSequence;
    } else if (this.id === "brackets") {
        inputSequence = handleBrackets(inputSequence);
        screen.innerHTML = inputSequence;
    } else if (this.id === "equals") {
        inputSequence = inputSequence.replace(/[\X(]$/, "").replace(/[\,\(\-\+\X\/]$/, "");
        var openParentheses = countNeededNrOfParentheses();

        if (openParentheses > 0){
            var neededNrOfParentheses = openParentheses;
            for (var i = 0; i < neededNrOfParentheses; i++) {
                inputSequence += ")";
                openParentheses -= 1;
            }
        }

        screen.innerHTML = inputSequence;
        result = inputSequence;
        result = result.replace(/X/g, "*").replace(/,/g, ".");
        result = eval(result);
        result = String(result).replace(/\./g, ",");
        screen.innerHTML = inputSequence + " = " + result;
        inputSequence = "";
    }
}


function handleDecimal(inputSequence) {
    var listOfNumbers = inputSequence.split(/[\+\-\X\%]/g);

    if (listOfNumbers[listOfNumbers.length -1] === "(" ||
        listOfNumbers[listOfNumbers.length -1] === ")" ||
        listOfNumbers[listOfNumbers.length -1] === "") {
        return inputSequence + "0,";
    } else if (listOfNumbers[listOfNumbers.length -1].includes(",")) {
        return inputSequence;
    } else {
        return inputSequence + ",";
    }
}


function countNeededNrOfParentheses() {
    var openParentheses = 0;
    for (var i = 0; i < inputSequence.length; i++) {
        if (inputSequence[i] === "("){
            openParentheses += 1;
        } else if (inputSequence[i] === ")") {
            openParentheses -= 1;
        }
    }
    return openParentheses;
}


function handleBrackets(inputSequence) {
    var parenthesesToAdd = "(";
    var lastChar = inputSequence.slice(-1);
    var openParentheses = countNeededNrOfParentheses();

    if (operators.includes(inputSequence.slice(-1))) {
        parenthesesToAdd = "(";
    } else if (Number(lastChar) !== NaN && inputSequence.length > 0 && openParentheses === 0) {
        parenthesesToAdd = "X(";
    } else if (lastChar === "("){ 
        parenthesesToAdd = "(";
    } else if (Number(lastChar) !== NaN && openParentheses > 0) {
        parenthesesToAdd = ")";
    }
    return inputSequence + parenthesesToAdd;
}

