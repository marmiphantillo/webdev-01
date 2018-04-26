var args = process.argv;

// SINGLE ARGUMENT CALC
if (args.length === 3) {
  var input = args[2];
  var parts, operator;

  // Check for operator
  if (input.includes('+')) {
    parts = input.split('+');
    operator = '+';
  } else if (input.includes('-')) {
    parts = input.split('-');
    operator = '-';
  } else if (input.includes('x')) {
    parts = input.split('x');
    operator = 'x';
  } else if (input.includes('/')) {
    parts = input.split('/');
    operator = '/';
  } else {
    console.error('No operator specified.');
    process.exit();
  }

  // validate numbers and calculate result
  numbers = validateNumbers(parts[0], parts[1]);
  calc(numbers.x, numbers.y, operator);

}

// MULTIPLE ARGUMENT CALC
if (args.length > 3) {
  var x = args[2];
  var y = args[4];
  var operator = args[3];

  // check for operator
  if (operator == "+" || operator == "-" || operator == "x" || operator == "/") {
    numbers = validateNumbers(x, y);
    calc(numbers.x, numbers.y, operator);
  } else {
    console.log('No operator specified.');
  }
}

function validateNumbers(x, y) {
  x = parseFloat(x);
  y = parseFloat(y);

  if (!isNaN(x) && !isNaN(y) && x !== 'undefined' && y !== 'undefined') {
    return {x, y};
  } else {
    console.error("Not a valid number.");
    process.exit();
  }
}

function calc(x, y, operator) {
  if (operator === '+') {
    console.log("> " + (x + y));
  }

  if (operator === '-') {
    console.log("> " + (x - y));
  }

  if (operator === 'x') {
    console.log("> " + (x * y));
  }

  if (operator === '/') {
    if ( y !== 0 ) {
      console.log("> " + (x / y));
    } else {
      console.error("Can't divide by zero.");
      process.exit();
    }
  }
}