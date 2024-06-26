import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import './editForm.css';
import BlockQuestion from '../addquestion/blockquestion';

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

const ModifyQuestionForm: React.FC = () => {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const [initialValues, setInitialValues] = useState<any>({ name: '', questions: [{ question: '', options: ['', ''] }] });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const storedForms = localStorage.getItem('forms');
    console.log('Stored forms:', storedForms);
    if (storedForms) {
      const forms = JSON.parse(storedForms);
      const formToEdit = forms.find((form: any) => form.id === parseInt(formId || '0'));
      console.log('Form to edit:', formToEdit);
      if (formToEdit) {
        setInitialValues(formToEdit);
      }
    }
    setIsLoading(false);
  }, [formId]);

  const handleSubmit = (values: any) => {
    const storedForms = localStorage.getItem('forms');
    let forms = [];
    if (storedForms) {
      forms = JSON.parse(storedForms);
    }
    const updatedForms = forms.map((form: any) => form.id === parseInt(formId || '0') ? { ...form, ...values } : form);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
    alert('Form updated!');
    navigate('/admin/question');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="add-question-form-container">
      <div className="header">
        <h2 className='add-new-form'>Modify Form</h2>
        <button id="addFormButton" type="submit" form="modifyForm">Save Changes</button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form id="modifyForm" className="add-question-form">
            <div className="form-group">
              <label htmlFor="name">Form Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((question:string, index:any) => (
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
                          <BlockQuestion index={index} onDelete={removeOption} onAdd={pushOption} />
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

export default ModifyQuestionForm;
