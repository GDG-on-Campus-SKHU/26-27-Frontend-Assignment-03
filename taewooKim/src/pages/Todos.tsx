import { useEffect } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import styled, { css } from 'styled-components';
import type { Filter, Todo } from '../types';
import TodoAddForm from '../components/TodoAddForm';
import TodoItem from '../components/TodoItem';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
];

const PageHeader = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 28px;
`;

const Description = styled.p`
  margin: 0;
  color: #6b7280;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #4b5563;
`;

const SortButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
  }

  &:disabled {
    color: #c4c8cf;
    cursor: not-allowed;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 16px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;

  &:hover {
    border-color: #4a7dff;
  }

  ${({ $active }) =>
    $active &&
    css`
      border-color: #4a7dff;
      background-color: #4a7dff;
      color: white;
      font-weight: bold;
    `}
`;

const Congrats = styled.p`
  margin: 16px 0 0;
  padding: 10px;
  border-radius: 8px;
  background-color: #e6f6ec;
  color: #1f9d55;
  text-align: center;
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
`;

const Empty = styled.div`
  margin-top: 16px;
  padding: 32px 16px;
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  color: #6b7280;
  text-align: center;

  p {
    margin: 4px 0;
  }
`;

const EmptyTitle = styled.p`
  color: #374151;
  font-weight: bold;
`;

const ClearButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border: 1px solid #ff8a8a;
  border-radius: 10px;
  background-color: white;
  color: #e5484d;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: #fff1f1;
  }
`;

interface TodosProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function Todos({ todos, setTodos }: TodosProps) {
  // 필터는 state가 아니라 URL의 :filter 값으로 정한다 (/todos/done → 'done')
  const params = useParams();
  const navigate = useNavigate();
  const filter = params.filter;
  const isValidFilter = filter === 'all' || filter === 'active' || filter === 'done';

  const doneCount = todos.filter((todo) => todo.done).length;
  const remainingCount = todos.length - doneCount;
  const isAllDone = todos.length > 0 && remainingCount === 0;

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  let emptyMessage: ReactNode;
  if (todos.length === 0) {
    emptyMessage = (
      <>
        <EmptyTitle>아직 등록된 할 일이 없어요</EmptyTitle>
        <p>위 입력창에 할 일을 적어 보세요.</p>
      </>
    );
  } else if (filter === 'active') {
    emptyMessage = <EmptyTitle>진행 중인 할 일이 없어요</EmptyTitle>;
  } else {
    emptyMessage = <EmptyTitle>완료한 할 일이 없어요</EmptyTitle>;
  }

  useEffect(() => {
    document.title = remainingCount > 0 ? `할 일 ${remainingCount}개 남음` : '오늘의 할 일';
  }, [remainingCount]);

  const handleAdd = (text: string) => {
    const trimmed = text.trim();
    if (trimmed === '') return;

    const newTodo: Todo = { id: Date.now(), text: trimmed, done: false };
    setTodos((prev) => [...prev, newTodo]);
    if (filter !== 'all') navigate('/todos/all');
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const handleEdit = (id: number, text: string) => {
    const trimmed = text.trim();
    if (trimmed === '') return;

    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSort = () => {
    setTodos((prev) => [...prev].sort((a, b) => a.text.localeCompare(b.text, 'ko')));
  };

  const handleClearDone = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  // /todos/abc처럼 정해지지 않은 필터로 들어오면 전체 필터로 보낸다
  if (!isValidFilter) {
    return <Navigate to="/todos/all" replace />;
  }

  return (
    <section>
      <PageHeader>
        <Title>오늘의 할 일</Title>
        <Description>작은 일부터 하나씩 완료해 보세요.</Description>
      </PageHeader>

      <TodoAddForm onAdd={handleAdd} />

      <Summary>
        <span>
          전체 {todos.length}개 / 완료 {doneCount}개
        </span>
        <SortButton type="button" onClick={handleSort} disabled={todos.length < 2}>
          이름순 정렬
        </SortButton>
      </Summary>

      <Tabs>
        {FILTERS.map((item) => (
          <Tab
            key={item.value}
            type="button"
            $active={filter === item.value}
            onClick={() => navigate(`/todos/${item.value}`)}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>

      {isAllDone && <Congrats>모든 할 일을 완료했어요!</Congrats>}

      {visibleTodos.length === 0 ? (
        <Empty>{emptyMessage}</Empty>
      ) : (
        <List>
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}

      {doneCount > 0 && (
        <ClearButton type="button" onClick={handleClearDone}>
          완료한 할 일 지우기 ({doneCount})
        </ClearButton>
      )}
    </section>
  );
}
