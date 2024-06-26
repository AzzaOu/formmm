import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './test.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid']
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn']
  },
  {
    question: 'What is the boiling point of water?',
    options: ['90°C', '100°C', '110°C', '120°C']
  }
];

const validationSchema = Yup.object({
  answers: Yup.array()
    .of(Yup.string().required('Required'))
    .length(questions.length, `All ${questions.length} questions must be answered`)
});

const QuizForm: React.FC = () => {
  const initialValues = {
    answers: new Array(questions.length).fill('')
  };

  const handleSubmit = (values: { answers: string[] }) => {
    console.log('Submitted answers:', values);
    alert('Form submitted successfully!');
  };

  return (
    <div className="quiz-form-container">
      <h2>Quiz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="quiz-form">
          {questions.map((q, index) => (
            <div key={index} className="question-container">
              <p>{q.question}</p>
              <div role="group" aria-labelledby={`question-${index}`}>
                {q.options.map((option, idx) => (
                  <label key={idx}>
                    <Field type="radio" name={`answers[${index}]`} value={option} />
                    {option}
                  </label>
                ))}
              </div>
              <ErrorMessage name={`answers[${index}]`} component="div" className="error" />
            </div>
          ))}
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default QuizForm;
