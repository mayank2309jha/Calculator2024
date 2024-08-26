document.addEventListener("DOMContentLoaded", function () {
  //Select all buttons inside the .input container
  const buttons = document.querySelectorAll(".input button");

  //Select the previous operand
  //It is the operand which has been given as input.
  const previousOperandTextElement =
    document.querySelector(".previous-operand");

  //Select the current operand
  //It is the operand which is being given as input.
  const currentOperandTextElement = document.querySelector(".current-operand");

  //Make a variable to show that the user is entering the first operand still.
  let isEnteringFirstOperand = true;

  //Make a string to take in the first operand and
  let firstOperand = "";

  //Make a string to take in the second operand
  let secondOperand = "";

  //Make a string to write the current operator.
  let currentOperator = "";

  //Add event listener to the buttons element.
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent;
      handleButtonClick(buttonText);
    });
  });

  //Handle button click, different for each button.
  function handleButtonClick(value) {
    if ((value >= "0" && value <= "9") || value == ".") {
      handleNumber(value);
    } else if (value == "AC") {
      handleAllClear();
    } else if (value == "DEL") {
      handleDelete();
    } else if (value == "=") {
      handleEquals();
    } else {
      handleOperator(value);
    }
  }

  //What to do if we get a number.
  function handleNumber(number) {
    if (isEnteringFirstOperand) {
      firstOperand += number;
      currentOperandTextElement.textContent = firstOperand;
    } else {
      secondOperand += number;
      currentOperandTextElement.textContent = secondOperand;
      previousOperandTextElement.textContent += number;
    }
  }

  //What to do if we get allclear.
  function handleAllClear() {
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
    isEnteringFirstOperand = true;
    previousOperandTextElement.textContent = "";
    currentOperandTextElement.textContent = "0";
  }

  //What to do if we get a delete.
  function handleDelete() {
    if (isEnteringFirstOperand) {
      firstOperand = firstOperand.slice(0, -1);
      currentOperandTextElement.textContent = firstOperand || "0";
    } else {
      secondOperand = secondOperand.slice(0, -1);
      currentOperandTextElement.textContent = secondOperand || "0";
    }
  }

  //What to do if we get a operator.
  function handleOperator(operator) {
    if (firstOperand === "") {
      console.log("first operand was empty");
      return;
    }
    if (secondOperand !== "") {
      console.log("second operand was empty");
      handleEquals();
    }
    currentOperator = operator;
    previousOperandTextElement.textContent = `${firstOperand} ${currentOperator}`;
    console.log(previousOperandTextElement.textContent);
    currentOperandTextElement.textContent = "";
    isEnteringFirstOperand = false;
  }

  //What to do if we get an equals sign.
  function handleEquals() {
    if (firstOperand === "" || secondOperand === "" || currentOperator === "") {
      console.log(
        "this being returned means that we went into equals operation when there was either no firstOperand, secondOperand or the third operand"
      );
      console.log(`${firstOperand}, ${secondOperand}, ${currentOperator}`);
      return;
    }
    const result = calculateResult();
    currentOperandTextElement.textContent = result;
    //previousOperandTextElement.textContent = `${firstOperand} ${currentOperator} ${secondOperand} = ${result}`;
    previousOperandTextElement.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperator = "";
    isEnteringFirstOperand = true;
  }

  //How to calculate the result of the calculator.
  function calculateResult() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    if (isNaN(num1) || isNaN(num2)) return "";
    let result;
    switch (currentOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        return "";
    }
    return result.toString();
  }
});
