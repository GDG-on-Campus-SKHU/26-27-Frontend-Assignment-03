import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import type { Todo } from './types';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

export default function App() {
  // 페이지를 옮겨 다녀도 할 일 목록이 유지되도록 App에 둔다
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <Routes>
      {/* 레이아웃 라우트: path 없이 모든 페이지(404 포함)를 공통 레이아웃으로 감싼다 */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        {/* 라우트 프리픽스: 자식 경로 앞에 /todos를 붙인다 */}
        <Route path="todos">
          <Route index element={<Navigate to="/todos/all" replace />} />
          <Route path=":filter" element={<Todos todos={todos} setTodos={setTodos} />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
