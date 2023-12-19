function quiz(terms_and_definitions, use_term_as_question) {
  const question_batch_size = Math.floor(terms_and_definitions.length * 0.3);

  // random.shuffle(terms_and_definitions)
  const questions = terms_and_definitions.map(td =>
    use_term_as_question ? td.term : td.definition
  );
  const answers = terms_and_definitions.map(td =>
    use_term_as_question ? td.definition : td.term
  );

  const incorrect_mc_answer_ids = [];
  const correct_mc_answer_ids = [];
  const incorrect_input_answer_ids = [];
  const correct_input_answer_ids = [];

  let i = 0;
  while (
    correct_mc_answer_ids.length !== terms_and_definitions.length &&
    correct_input_answer_ids.length !== terms_and_definitions.length
  ) {
    const question = questions[i];
    const answer = answers[i];

    if (
      correct_mc_answer_ids.length &&
      ((i + 1) % question_batch_size === 0 || i === terms_and_definitions.length)
    ) {
      // ask input based questions

      for (const mc_id of [
        ...correct_mc_answer_ids.filter(id => !correct_input_answer_ids.includes(id)),
        ...incorrect_input_answer_ids,
      ]) {
        const input_question = questions[mc_id];
        const input_answer = answers[mc_id];

        alert(`\nInput Question ${mc_id + 1}\n${input_question}`);

        if (prompt("Input an answer: ") === input_answer) {
          alert("Correct!");
          correct_input_answer_ids.push(mc_id);
          const index = incorrect_input_answer_ids.indexOf(mc_id);
          if (index !== -1) {
            incorrect_input_answer_ids.splice(index, 1);
          }
        } else {
          alert(`Incorrect. The correct answer is:\n${input_answer}`);
          incorrect_input_answer_ids.push(mc_id);
        }
      }
    } else {
      // ask multiple choice based questions
      const random_answers = [...answers.filter(a => a !== answer).slice(0, 3), answer,].sort(() => Math.random() - 0.5);
      console.debug(random_answers)

      alert(`\nQuestion ${i + 1}\n${question}`);

      for (let j = 0; j < random_answers.length; j++) {
        alert(`${String.fromCharCode(65 + j)}. ${random_answers[j]}`);
      }

      const user_answer = prompt("Select an answer: ").charCodeAt(0) - 65;

      if (random_answers[user_answer] === answer) {
        alert("Correct!");
        correct_mc_answer_ids.push(i);
        const index = incorrect_mc_answer_ids.indexOf(i);
        if (index !== -1) {
          incorrect_mc_answer_ids.splice(index, 1);
        }
      } else {
        alert(
          `You answered ${random_answers[user_answer]}. The correct answer is: ${answer}`
        );
        incorrect_mc_answer_ids.push(i);
      }
    }

    if (i !== terms_and_definitions.length - 1) {
      i += 1;
    } else if (incorrect_mc_answer_ids.length !== 0) {
      i = incorrect_mc_answer_ids[0];
    } else if (incorrect_input_answer_ids.length !== 0) {
      i = incorrect_input_answer_ids[0];
    }
  }

  alert("You've finished!");
}

const terms_and_definitions = [
  {
    "term": "JavaScript",
    "definition": "A high-level, dynamic, weakly typed, object-based, multi-paradigm, and interpreted programming language.",
  },
  {
    "term": "Java",
    "definition": "A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
  },
  {
    "term": "HTML",
    "definition": "The standard markup language for creating web pages.",
  },
  {
    "term": "CSS",
    "definition": "A style sheet language used for describing the presentation of a document written in HTML or XML.",
  },
  {
    "term": "SQL",
    "definition": "A domain-specific language used in programming and designed for managing data held in a relational database management system.",
  },
  {
    "term": "API",
    "definition": "A set of protocols, routines, and tools for building software and applications.",
  },
  {
    "term": "URL",
    "definition": "A reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it.",
  },
  {
    "term": "q1",
    "definition": "a1",
  },
  {
    "term": "q2",
    "definition": "a2",
  },
  {
    "term": "q3",
    "definition": "a3",
  },
];

quiz(terms_and_definitions, use_term_as_question = false);