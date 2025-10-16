let currentQuestion = {};

const questions = [
  // Array of factors must be strings without parentheses
  { expression: '3x^2 + 12x', factors: ['3x', 'x+4'], displaySolution: '3x(x+4)', method: 'Greatest Common Factor (GCF)' },
  { expression: 'x^2 - 81', factors: ['x-9', 'x+9'], displaySolution: '(x-9)(x+9)', method: 'Difference of Squares' },
  { expression: 'x^2 + 8x + 15', factors: ['x+3', 'x+5'], displaySolution: '(x+3)(x+5)', method: 'Trinomial (a=1)' },
  { expression: 'x^2 - x - 12', factors: ['x-4', 'x+3'], displaySolution: '(x-4)(x+3)', method: 'Trinomial (a=1)' },
  { expression: '2x^2 + 5x - 3', factors: ['2x-1', 'x+3'], displaySolution: '(2x-1)(x+3)', method: 'Trinomial (a>1)' },
  { expression: '3x^2 - 11x + 6', factors: ['3x-2', 'x-3'], displaySolution: '(3x-2)(x-3)', method: 'Trinomial (a>1)' },
  { expression: 'x^3 + 27', factors: ['x+3', 'x^2-3x+9'], displaySolution: '(x+3)(x^2-3x+9)', method: 'Sum of Cubes' },
  { expression: '8x^3 - 1', factors: ['2x-1', '4x^2+2x+1'], displaySolution: '(2x-1)(4x^2+2x+1)', method: 'Difference of Cubes' },
  { expression: 'x^3 - 4x^2 + 2x - 8', factors: ['x^2+2', 'x-4'], displaySolution: '(x^2+2)(x-4)', method: 'Factoring by Grouping' },
  // This problem now expects 3 factors
  { expression: '5x^2 - 20', factors: ['5', 'x-2', 'x+2'], displaySolution: '5(x-2)(x+2)', method: 'GCF then Difference of Squares' }
];

function setMode(mode) {
  document.getElementById('practiceMode').classList.add('hidden');
  document.getElementById('studyMode').classList.add('hidden');
  
  if (mode === 'practice') {
    document.getElementById('practiceMode').classList.remove('hidden');
    loadRandomQuestion();
  } else if (mode === 'study') {
    document.getElementById('studyMode').classList.remove('hidden');
  }
}

function loadRandomQuestion() {
  // Hide feedback and reset state
  document.getElementById('practiceFeedback').classList.add('hidden');
  document.getElementById('practiceSolution').classList.add('hidden');
  document.getElementById('submit-btn').classList.remove('hidden');
  document.getElementById('next-btn').classList.add('hidden');
  
  // Pick a random question
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];
  
  // Display the question expression
  document.getElementById('practiceQuestion').innerHTML = `Factor the following expression: <br> <strong>${currentQuestion.expression}</strong>`;

  // --- NEW: Dynamically create input fields ---
  const inputsContainer = document.getElementById('factor-inputs-container');
  inputsContainer.innerHTML = ''; // Clear previous inputs

  // Create an input for each expected factor
  currentQuestion.factors.forEach((factor, index) => {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'factor-input-group';

      const label = document.createElement('label');
      label.setAttribute('for', `factor-${index}`);
      label.textContent = `Factor ${index + 1}:`;

      const input = document.createElement('input');
      input.type = 'text';
      input.id = `factor-${index}`;
      input.className = 'factor-input';
      input.placeholder = 'Enter a factor';

      inputGroup.appendChild(label);
      inputGroup.appendChild(input);
      inputsContainer.appendChild(inputGroup);
  });
}

function normalizeAnswer(answer) {
  // Remove spaces, parentheses, and convert to lowercase for consistent comparison
  return answer.replace(/[\s()]/g, '').toLowerCase();
}

function checkAnswer() {
  // Collect all student answers from the input fields
  const studentInputs = document.querySelectorAll('.factor-input');
  const studentFactors = [];
  studentInputs.forEach(input => {
      // Only add non-empty answers to the array
      if (input.value.trim() !== '') {
          studentFactors.push(normalizeAnswer(input.value));
      }
  });

  // Get the correct factors, also normalized
  const correctFactors = currentQuestion.factors.map(f => normalizeAnswer(f));

  // To check for correctness regardless of order, we sort both arrays
  // and compare them as strings.
  const isCorrect = studentFactors.length === correctFactors.length &&
                    studentFactors.sort().join(',') === correctFactors.sort().join(',');

  const feedbackEl = document.getElementById('practiceFeedback');
  const solutionEl = document.getElementById('practiceSolution');
  
  // Provide feedback
  if (isCorrect) {
    feedbackEl.textContent = 'Correct! Excellent work.';
    feedbackEl.className = 'feedback correct';
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
  } else {
    feedbackEl.textContent = 'Not quite. Check your factors. Remember to look for a GCF first!';
    feedbackEl.className = 'feedback incorrect';
  }
  
  // Show solution
  solutionEl.innerHTML = `<strong>Solution:</strong> ${currentQuestion.displaySolution} <br> <strong>Method:</strong> ${currentQuestion.method}`;
  feedbackEl.classList.remove('hidden');
  solutionEl.classList.remove('hidden');
}