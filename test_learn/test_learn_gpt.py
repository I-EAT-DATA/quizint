import random

# Helper function to shuffle the definitions


def shuffle_definitions(correct_definition, definitions):
    definitions_copy = list(definitions)
    definitions_copy.remove(correct_definition)
    shuffled_definitions = [correct_definition]
    while definitions_copy:
        index = random.randint(0, len(definitions_copy)-1)
        shuffled_definitions.append(definitions_copy.pop(index))
    return shuffled_definitions


# Function to ask a multiple choice question and return whether or not the user got it right
def ask_multiple_choice_question(question, options):
    # Shuffle the options
    random.shuffle(options)

    # Print the question
    print(question)

    # Print the options
    for i in range(len(options)):
        print(f"{i+1}. {options[i]['definition']}")

    # Prompt the user for their answer
    while True:
        try:
            answer = int(input("Enter the number of the correct answer: "))
            if answer < 1 or answer > len(options):
                raise ValueError()
            break
        except ValueError:
            print("Invalid input. Please enter a number between 1 and", len(options))

    # Check if the answer is correct
    if options[answer-1]['term'] == question:
        print("Correct!")
        return True
    else:
        print("Incorrect. Try again.")
        return False


# Function to ask for a text input question and return whether or not the user got it right
def ask_input_question(term, definition):
    print(f"What is the definition of {term}?")
    answer = input("Enter your answer: ")
    return answer == definition

# Main function


def quiz(terms_and_definitions, use_term_as_question=True):
    num_terms = len(terms_and_definitions)
    num_questions = int(num_terms * 0.2)
    terms_to_ask = random.sample(terms_and_definitions, num_questions)
    num_asked = 0
    while True:
        term_and_definition = terms_to_ask[num_asked]
        if use_term_as_question:
            term = term_and_definition["term"]
            definition = term_and_definition["definition"]
        else:
            term = term_and_definition["definition"]
            definition = term_and_definition["term"]
        definitions = [td["definition"]
                       for td in terms_and_definitions if td != term_and_definition]
        is_multiple_choice = num_asked < (num_questions-1)
        if is_multiple_choice:
            is_correct = ask_multiple_choice_question(
                term, terms_and_definitions)
        else:
            is_correct = ask_input_question(term, definition)
        if is_correct:
            print("Correct!")
            num_asked += 1
            if num_asked == num_questions:
                print("Congratulations! You got them all!")
                break
        else:
            print("Incorrect. Try again.")


# Example usage
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

# Ask questions with terms as questions and definitions as options
quiz(terms_and_definitions, use_term_as_question=True)

# Ask questions with definitions as questions and terms as options
quiz(terms_and_definitions, use_term_as_question=False)
