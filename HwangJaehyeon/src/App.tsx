import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';
import type { Todo } from './types';
import "./App.css"; // 공통 css로 수정함

export default function App() {
  // 페이지를 이동해도 앱을 열어 둔 동안은 목록을 유지
  const [todos, setTodos] = useState<Todo[]>([]);

  // Todo 동작 함수 정의들
  function handleAddTodo(text: string) {
    const id = Date.now();
    setTodos((previous) => [...previous, { id, text, done: false }]);
  }

  function handleToggleTodo(id: number) {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleEditTodo(id: number, text: string) {
    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    );
  }

  function handleDeleteTodo(id: number) {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }

  function handleSortTodos() {
    setTodos((previous) =>
      [...previous].sort((a, b) => a.text.localeCompare(b.text, 'ko')),
    );
  }

  function handleClearDoneTodos() {
    setTodos((previous) => previous.filter((todo) => !todo.done));
  }

  return (
    // page Routing 정의
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="todos" element={<Navigate to="/todos/all" replace />} />
        <Route
          path="todos/:filter"
          element={
            <TodoPage
              todos={todos}
              onAdd={handleAddTodo}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
              onSort={handleSortTodos}
              onClearDone={handleClearDoneTodos}
            />
          }
        />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
