import React from 'react';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import './blockquestion.css';

interface BlockQuestionProps {
  index: number;
  onDelete: (index: number) => void;
  onAdd: (value: string, correctIndexes: number[]) => void;
}

const BlockQuestion: React.FC<BlockQuestionProps> = ({ index, onDelete, onAdd }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleCheckboxChange = (optionIndex: number, checked: boolean) => {
    const currentCorrectIndexes = values.questions[index].correctIndexes || [];
    let newCorrectIndexes: number[];

    if (checked) {
      newCorrectIndexes = [...currentCorrectIndexes, optionIndex];
    } else {
      newCorrectIndexes = currentCorrectIndexes.filter((idx: number) => idx !== optionIndex);
    }

    setFieldValue(`questions[${index}].correctIndexes`, newCorrectIndexes.length > 0 ? newCorrectIndexes : null);
  };

  const addOption = (value: string, correctIndexes: number[]) => {
    onAdd(value, correctIndexes);
    setFieldValue(`questions[${index}].newOption`, ''); // Clear the New Option field
  };

  return (
    <div>
      {values.questions[index].options.map((option: string, optionIndex: number) => (
        <div key={optionIndex} className="form-group">
          <input
            type="checkbox"
            id={`questions[${index}].options[${optionIndex}].correct`}
            name={`questions[${index}].options[${optionIndex}].correct`}
            checked={values.questions[index].correctIndexes?.includes(optionIndex)}
            onChange={(e) => handleCheckboxChange(optionIndex, e.target.checked)}
          />
          <label htmlFor={`questions[${index}].options[${optionIndex}]`}>Option {optionIndex + 1}:</label>
          <Field
            type="text"
            id={`questions[${index}].options[${optionIndex}]`}
            name={`questions[${index}].options[${optionIndex}]`}
          />
          <ErrorMessage name={`questions[${index}].options[${optionIndex}]`} component="div" className="error" />
          <button className="remove-option" type="button" onClick={() => onDelete(optionIndex)}>
            -
          </button>
        </div>
      ))}
      <div className="form-group">
        <span>New Option:</span>
        <Field
          type="text"
          id={`questions[${index}].newOption`}
          name={`questions[${index}].newOption`}
        />
        <button type="button" className="add-option" onClick={() => addOption(values.questions[index].newOption, [])}>
          +
        </button>
      </div>
    </div>
  );
};

export default BlockQuestion;
