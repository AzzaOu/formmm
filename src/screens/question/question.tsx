import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../question/question.css';

interface Form {
  id: number;
  name: string;
  questions: {
    question: string;
    options: string[];
  }[];
}

const QuestionList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = localStorage.getItem('forms');
    if (storedForms) {
      setForms(JSON.parse(storedForms));
    }
  }, []);

  const handleViewForm = (formId: number) => {
    const selectedForm = forms.find((form) => form.id === formId);
    if (selectedForm) {
      navigate(`/admin/viewform/${formId}`);
    }
  };

  const handleEditForm = (formId: number) => {
    navigate(`/admin/editform/${formId}`);
  };

  const confirmDelete = (formId: number) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce formulaire ?");
    if (confirmed) {
      handleDeleteForm(formId);
    }
  };

  const handleDeleteForm = (formId: number) => {
    const updatedForms = forms.filter((form) => form.id !== formId);
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  const handleAddQuestionForm = () => {
    navigate('/admin/addquestion');
  };

  return (
    <div className="question-list-container">
      <h2>Formulaires de Questions</h2>
      <button className="add-form-button" onClick={handleAddQuestionForm}>Ajouter un Nouveau Formulaire</button>
      <table className="forms-table">
        <thead>
          <tr>
            <th>Nom du Formulaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id}>
              <td>{form.name}</td>
              <td className="actions-cell">
                <button className="view-button" onClick={() => handleViewForm(form.id)}>👁️ Consulter</button>
                <button className="edit-button" onClick={() => handleEditForm(form.id)}>✏️ Modifier</button>
                <button className="delete-button" onClick={() => confirmDelete(form.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionList;
