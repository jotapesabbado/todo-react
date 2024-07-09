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
      <Route exact path="/react-todo/" element={<TodoHomePage />} />
      <Route path="/react-todo/add-todo" element={<TodoAddPage />}/>
      <Route path="/react-todo/edit-todo/:id" element={<TodoEditPage />}/>
      <Route path="/react-todo/list-todo" element={<TodoListPage />}/>
    </Routes>
  </Router>
  );
};

export default App;
