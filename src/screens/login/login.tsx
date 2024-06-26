import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../validations/auth.validation';
import './login.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';



const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = React.useCallback((values: { email: string; password: string }) => {
    if (values.email === 'admin@test.test' && values.password == 'test') {
      navigate('/admin');
    } else {
      alert('Error');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validateLoginForm}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
      <div className="login-image-container">
        <img src="/image/ent.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default Login;
