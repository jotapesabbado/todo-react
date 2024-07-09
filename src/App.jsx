import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TodoHomePage from './pages/TodoHomePage';
import { TodoAddPage } from "./pages/TodoAddPage";
import { TodoEditPage } from "./pages/TodoEditPage";
import { TodoListPage } from "./pages/TodoListPage";


const App = () => {
  return (
    <Router>
    <NavigationBar />
    <Routes>
      <Route exact path="/todo-react/" element={<TodoHomePage />} />
      <Route path="/todo-react/add-todo" element={<TodoAddPage />}/>
      <Route path="/todo-react/edit-todo/:id" element={<TodoEditPage />}/>
      <Route path="/todo-react/list-todo" element={<TodoListPage />}/>
    </Routes>
  </Router>
  );
};

export default App;
