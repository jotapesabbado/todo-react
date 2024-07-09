import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import TodoHomePage from './pages/TodoHomePage';
import { TodoAddPage } from "./pages/TodoAddPage";
import { TodoEditPage } from "./pages/TodoEditPage";
import { TodoListPage } from "./pages/TodoListPage";


const App = () => {
  return (
    <Router basename="/todo-react/">
    <NavigationBar />
    <Routes>
      <Route exact path="/" element={<TodoHomePage />} />
      <Route path="/add-todo" element={<TodoAddPage />}/>
      <Route path="/edit-todo/:id" element={<TodoEditPage />}/>
      <Route path="/list-todo" element={<TodoListPage />}/>
    </Routes>
  </Router>
  );
};

export default App;
