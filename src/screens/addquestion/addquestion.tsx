import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './addquestion.css';
import BlockQuestion from './blockquestion';

const validationSchema = Yup.object({
  name: Yup.string().required('Form Name is required'),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('Question is required'),
      options: Yup.array()
        .of(Yup.string().required('Option is required'))
        .min(2, 'At least two options are required')
    })
  )
});

const AddQuestionForm: React.FC = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState(() => {
    const storedForms = localStorage.getItem('forms');
    return storedForms ? JSON.parse(storedForms) : [];
  });

  const handleSubmit = (values: any) => {
    const newForm = {
      id: forms.length + 1,
      name: values.name,
      questions: values.questions
    };
    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    alert('New form added!');
    navigate('/admin/question');
  };

  return (
    <div className="add-question-form-container">
      <div className="header">
        <h2 className='add-new-form'>Add New Form</h2>
        <button id="addFormButton" type="submit" form="addForm">Add Form</button>
      </div>
      <Formik
        initialValues={{ name: '', questions: [{ question: '', options: ['', ''] }] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="addForm" className="add-question-form">
            <div className="form-group">
              <label htmlFor="name">Form Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((_, index) => (
                    <div key={index} className="question-container">
                      <div className="form-group">
                        <label htmlFor={`questions[${index}].question`}>Question:</label>
                        <Field type="text" id={`questions[${index}].question`} name={`questions[${index}].question`} />
                        <ErrorMessage name={`questions[${index}].question`} component="div" className="error" />
                        <button className="remove-question" type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      </div>
                      <FieldArray name={`questions[${index}].options`}>
                        {({ push: pushOption, remove: removeOption }) => (
                          <BlockQuestion index={index} onDelete={removeOption} onAdd={pushOption}/>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  <button className="add-question" type="button" onClick={() => push({ question: '', options: ['', ''] })}>
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddQuestionForm;
