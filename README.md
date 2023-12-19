# Quizint, A Quizlet Clone

A simple little Quizlet clone created with ReactJS and Bulma CSS because I'm annoyed by paywalls, and thought it would be fun.

It is however incomplete, the main focus was learn. There is a start on the Match feature with `react-dnd` but I'll leave finishing it as an exercise to the reader.

## Quickstart

In the `quizint` and `quizint_server` directories, you can run:

### `npm install` then `npm start`

And you should be up and running!

## Bugs

- Please note that the `docker-compose.yml` is a scam and doesn't quite work yet due to puppeteer issues.
  - If you're feeling brave, and want to try and get it working, you can build the containers with `docker build -t <quizint/quizint_server> .` in each directory.
- If you get too many questions wrong, there's a logic flaw that causes everything to break, so that needs work.
- Likely other ones I don't know about because there are not tests yet.
