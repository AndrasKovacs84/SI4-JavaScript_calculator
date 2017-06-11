var keys = document.getElementById("keys").getElementsByTagName("span");
var inputSequence = "";
var operators = ["+", "-", "X", "/", "%"]
var openParentheses = 0;

for (var i=0; i < keys.length; i++) {
    keys[i].addEventListener("click", activated)
}


function activated() {
    var screen = document.getElementById("screen")
    var numbers = document.getElementsByClassName("number");
    var button = this.innerHTML;

    if (this.id === "clear"){
        inputSequence = "";
        screen.innerHTML = inputSequence;    
    } else if (this.id === "backspace") {
        if (inputSequence.slice(-1) === "("){
            openParentheses -= 1;
        } else if (inputSequence.slice(-1) === ")") {
            openParentheses += 1;
        }
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
        inputSequence += this.innerHTML;
        screen.innerHTML = inputSequence;
    } else if (this.id === "decimal") {
        inputSequence = handleDecimal(inputSequence);
        screen.innerHTML = inputSequence;
    } else if (this.id === "brackets") {
        inputSequence = handleBrackets(inputSequence);
        screen.innerHTML = inputSequence;
    } else if (this.id === "equals") {
        if (openParentheses > 0){
            for (var i = 0; i < openParentheses.length -1; i++) {
                inputSequence += ")";
            }
        }
        inputSequence = inputSequence.replace(/[\X(]$/, "").replace(/[\,\(\-\+\X\/]$/, "");
        screen.innerHTML = inputSequence;
        result = inputSequence;
        result = result.replace(/X/g, "*").replace(/,/g, ".");
        alert(result);
        result = eval(result);
        result = String(result).replace(/\./g, ",");
        screen.innerHTML = inputSequence + " = " + result;
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


function handleBrackets(inputSequence) {
    var parenthesesToAdd = "(";
    var lastChar = inputSequence.slice(-1);

    if (operators.includes(inputSequence.slice(-1))) {
        parenthesesToAdd = "(";
        openParentheses += 1;
    } else if (Number(lastChar) != NaN && inputSequence.length > 0 && openParentheses === 0) {
        parenthesesToAdd = "X(";
        openParentheses += 1;
    } else if (Number(lastChar) != NaN && openParentheses > 0) {
        parenthesesToAdd = ")";
        openParentheses -= 1;
    } else {
        parenthesesToAdd = "(";
        openParentheses += 1;
    }
    return inputSequence + parenthesesToAdd;
}


/*    
    var openParentheses = 0;

    for (var i = 0; i < inputSequence.length; i++) {
        if (inputSequence[i] === "("){
            openParentheses += 1;
        } else if (inputSequence[i] === ")") {
            openParentheses -= 1;
        }
    }
    if (operators.includes(inputSequence.slice(-1))) {
        parenthesesToAdd = "(";
    } else if (Number(lastChar) != NaN && inputSequence.length > 0 && openParentheses === 0) {
        parenthesesToAdd = "X(";
    } else if (Number(lastChar) != NaN && openParentheses > 0) {
        parenthesesToAdd = ")";
    } else {
        parenthesesToAdd = "(";
    }
    return inputSequence + parenthesesToAdd;
}
*/

