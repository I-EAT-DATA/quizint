import random


def quiz(terms_and_definitions, use_term_as_question):
    question_batch_size = int(len(terms_and_definitions) * 0.3)

    # random.shuffle(terms_and_definitions)
    questions = [td["term"] if use_term_as_question else td["definition"]
                 for td in terms_and_definitions]
    answers = [td["definition"] if use_term_as_question else td["term"]
               for td in terms_and_definitions]

    incorrect_mc_answer_ids = []
    correct_mc_answer_ids = []
    incorrect_input_answer_ids = []
    correct_input_answer_ids = []
    i = 0
    while len(correct_mc_answer_ids) != len(terms_and_definitions) and len(correct_input_answer_ids) != len(terms_and_definitions):
        question = questions[i]
        answer = answers[i]

        if len(correct_mc_answer_ids) and (i + 1) % question_batch_size == 0 or i == len(terms_and_definitions):
            # ask input based questions

            for mc_id in [answer_id for answer_id in correct_mc_answer_ids if not answer_id in correct_input_answer_ids] + incorrect_input_answer_ids:
                input_question = questions[mc_id]
                input_answer = answers[mc_id]

                print(f"\nInput Question {mc_id + 1}")
                print(input_question)

                if (input("Input an answer: ") == input_answer):
                    print("Correct!")
                    correct_input_answer_ids.append(mc_id)
                    if mc_id in incorrect_input_answer_ids:
                        incorrect_input_answer_ids.remove(mc_id)
                else:
                    print("Incorrect. The correct answer is:")
                    print(input_answer)
                    incorrect_input_answer_ids.append(mc_id)
        else:
            # ask multipule choice based questions
            print(f"\nQuestion {i+1}")
            print(question)

            # generate some random answers for the user to choose from
            random_answers = random.sample(
                [a for a in answers if a != answer], 3) + [answer]
            # random.shuffle(random_answers)

            # print possible answers
            for answer_i, answer in enumerate(random_answers):
                print(f"{chr(answer_i + 65)}. {answer}")

            # ask user for answer
            user_answer = ord(input("Select an answer: "))-65

            # check if user answer is correct
            if (random_answers[user_answer] == answer):
                print("Correct!")
                correct_mc_answer_ids.append(i)
                if i in incorrect_mc_answer_ids:
                    incorrect_mc_answer_ids.remove(i)
            else:
                print(
                    f"You answered {random_answers[user_answer]} the correct answer is:")
                print(answer)
                incorrect_mc_answer_ids.append(i)

        if i != len(terms_and_definitions) - 1:
            print("Adding to i")
            i += 1
        elif len(incorrect_mc_answer_ids) != 0:
            i = incorrect_mc_answer_ids[0]
        elif len(incorrect_input_answer_ids) != 0:
            i = incorrect_input_answer_ids[0]

    print("You've finished!")


terms_and_definitions = [
    {"term": "Python", "definition": "A high-level programming language for general-purpose programming."},
    {"term": "JavaScript", "definition": "A high-level, dynamic, weakly typed, object-based, multi-paradigm, and interpreted programming language."},
    {"term": "Java", "definition": "A class-based, object-oriented programming language designed to have as few implementation dependencies as possible."},
    {"term": "HTML", "definition": "The standard markup language for creating web pages."},
    {"term": "CSS", "definition": "A style sheet language used for describing the presentation of a document written in HTML or XML."},
    {"term": "SQL", "definition": "A domain-specific language used in programming and designed for managing data held in a relational database management system."},
    {"term": "API", "definition": "A set of protocols, routines, and tools for building software and applications."},
    {"term": "URL", "definition": "A reference to a web resource that specifies its location on a computer network and a mechanism for retrieving it."},
    {"term": "q1", "definition": "a1"},
    {"term": "q2", "definition": "a2"},
    {"term": "q3", "definition": "a3"},
]

quiz(terms_and_definitions, use_term_as_question=False)
