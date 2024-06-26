import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Form {
  id: number;
  name: string;
  questions: {
    question: string;
    options: string[];
    correctIndexes: number[]; 
  }[];
}

const ViewForm: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    if (formId) {
      const storedForms = localStorage.getItem('forms');
      if (storedForms) {
        const forms: Form[] = JSON.parse(storedForms);
        const selectedForm = forms.find((form) => form.id === parseInt(formId, 10));
        if (selectedForm) {
          setForm(selectedForm);
        }
      }
    }
  }, [formId]);

  if (!form) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="form-container">
      <h2>{form.name}</h2>
      <div className="questions-container">
        {form.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question">
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  {option} {question.correctIndexes.includes(optionIndex) ? '✔️' : ''}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewForm;
