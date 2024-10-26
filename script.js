const numberBotton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const currentScreenTextElement = document.querySelector('[data-operand-current]');
const previousScreenTextElement = document.querySelector('[data-operand-previous]');


class Calculator {
    constructor(currentScreenTextElement, previousScreenTextElement) 
    {
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    flusOperator(operation){
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute(){
        let computetion;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(previous) || isNaN(current)) return;
        switch(this.operation){
            case "+":
            computetion = previous + current;
            break;
            case "-":
            computetion = previous - current;
            break;
            case "x":
            computetion = previous * current;
            break;
            case "÷":
            computetion = previous / current;
            break;

            default:
                return;
        }
        this.currentOperand = computetion;
        this.previousOperand = "";
        this.operation = undefined;
    }   
    updateDispay(){
        this.currentScreenTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }
}

const calculator = new Calculator(
    currentScreenTextElement,
    previousScreenTextElement);

numberBotton.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDispay();
    });
});


operationButton.forEach((button) => {
    button.addEventListener("click", () =>{
        calculator.flusOperator(button.innerText);
        calculator.updateDispay();
    });
});

equalsButton.addEventListener("click", () =>{
    calculator.compute();
    calculator.updateDispay();
});

allClearButton.addEventListener("click", () =>{
    calculator.clear();
    calculator.updateDispay();
})


deleteButton.addEventListener("click", () =>{
    calculator.delete();
    calculator.updateDispay();
})










