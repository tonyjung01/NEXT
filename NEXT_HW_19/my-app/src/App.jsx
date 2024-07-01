import React, { useState } from 'react';
import './App.css';

function Header({ children }) {
  return <header><h1>{children}</h1></header>;
}

function TodoItem({ todo, onDelete, onEdit, onToggleEdit }) {
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, newText);
  };

  return (
    <li>
      {todo.isEditing ? (
        <div className="edit-mode">
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <div className="action-buttons">
            <button className="action" onClick={handleSave}>저장</button>
          </div>
        </div>
      ) : (
        <div className="todo-item">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <div className="buttons">
            <button className="action" onClick={() => onToggleEdit(todo.id)}>수정</button>
            <button className="action delete" onClick={() => onDelete(todo.id)}>삭제</button>
          </div>
        </div>
      )}
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, isEditing: false, completed: false },
      ]);
      setInput('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const handleToggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="todo-list-container">
      <Header>투두 리스트</Header>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 추가하세요!"
        />
        <button className="add" onClick={handleAddTodo}>추가</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            onToggleEdit={handleToggleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
