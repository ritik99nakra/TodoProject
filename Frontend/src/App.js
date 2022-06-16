
import './App.css';
import CreateTodo from './components/CreateTodo';
import {  Routes, Route } from "react-router-dom";
import ShowMyTodos from './components/ShowMyTodos';
import UpdateTodo from './components/UpdateTodo';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';
import PreviewTodoPage from './components/PreviewTodoPage';

function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/logout" element={<Logout />} exact />
          <Route path="/createtodo" element={<CreateTodo />} exact />
          <Route path="/showmytodos" element={<ShowMyTodos />} exact />
          <Route path="/updatetodo" element={<UpdateTodo />} exact />
          <Route path="/previewtodopage" element={<PreviewTodoPage />} exact />
        </Routes>
   
    </div>
  );
}

export default App;
