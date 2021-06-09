// Listening to key-presses
// Five things can happen when a person gets hold of a calculator:
//
// They hit a number key (0-9)
// They hit an operator key (+, -, ×, ÷)
// They hit the decimal key
// They hit the equal key
// They hit the clear key


// The first step to building this calculator is to be able to (1) listen for all keypresses and (2) determine the type of key that pressed. In this case, we can use an event delegation pattern to listen since keys are all children of .calculator__keys.

const calculator = document.querySelector('.calculator')


const keys = calculator.querySelector('.calculator__keys')


//working on the calculator display/
const display = document.querySelector('.calculator__display')


const previousKeyType = calculator.dataset.previousKeyType


const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}



keys.addEventListener('click', e => {
  const key = e.target
  const action = key.dataset.action
  //working on the display
  const keyContent = key.textContent
  const displayedNum = display.textContent
  if (e.target.matches('button')) {
    // Do something
    // Remove .is-depressed class from all keys
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
    if (!action) {
            console.log('number key!')
            if ( displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
              console.log('This number is not 0 or operator or calculate')

                display.textContent = keyContent
              } else if(previousKeyType=== "decimal"){
                console.log('the previous key was a decimal')
                display.textContent = displayedNum + keyContent }

              else {
                console.log('the previous key was a number')
                display.textContent =  displayedNum +keyContent }
                // displayedNum +
              calculator.dataset.previousKeyType = 'number'
            }
          }
  if (action === 'add' ||action === 'subtract' ||action === 'multiply' ||action === 'divide') {
            // console.log('operator key!')

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            calculator.dataset.previousKeyType = 'operator'
            key.classList.add('is-depressed')

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate' ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            }else {
                calculator.dataset.firstValue = displayedNum
              }



            calculator.dataset.operator = action
                          }
  if (action === 'decimal') {
              // console.log('decimal key!')
              if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
              } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
              ) {
                display.textContent = '0.'
              }

              calculator.dataset.previousKeyType = 'decimal'

              }
  if (action === 'calculate') {
              let firstValue = calculator.dataset.firstValue
              const operator = calculator.dataset.operator
              const secondValue = displayedNum

              if (firstValue) {
                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum
                        secondValue = calculator.dataset.modValue
                      }

                    display.textContent = calculate(firstValue, operator, secondValue)
                    }
              // Set modValue attribute
              calculator.dataset.modValue = secondValue
              calculator.dataset.previousKeyType = 'calculate'
            }
  if (action === 'clear') {
      if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.operator = ''
          calculator.dataset.previousKeyType = ''
      } else {
          key.textContent = 'reset'
        }

        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
      }
  if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'DEL'
    }
})
