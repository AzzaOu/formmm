import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Admin from './admin/admin';
import Login from './login/login';
import Test from './test/test';
import Question from './question/question';
import Addquestion from './addquestion/addquestion';
import QuestionList from './question/question';
import AddQuestionForm from './addquestion/addquestion';
import ViewForm from './question/viewForm';
import EditForm from './question/editForm';

const routes: RouteObject[] = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "question",
        element: <QuestionList />
      },
      {
        path: "addquestion",
        element: <AddQuestionForm />,
      },
      {
        path: "viewform/:formId",
        element: <ViewForm />, 
      },
      {
        path: "editform/:formId",
        element: <EditForm />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/test",
    element: <Test />,
  },

];

const router = createBrowserRouter(routes);

export default router;
