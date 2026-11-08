import styled from 'styled-components';
import type { TodoListProps } from '../types';
import TodoItem from './TodoItem';

const Empty = styled.div`
  margin-top: 18px;
  padding: 30px 14px;
  border: 1px dashed #d6dcee;
  border-radius: 12px;
  background: #f8f9fd;
  text-align: center;

  p {
    margin: 0;
    font-weight: 650;
  }

  p + p {
    margin-top: 5px;
    color: #566173;
    font-size: 14px;
    font-weight: 400;
  }
`;

const List = styled.ul`
  display: grid;
  gap: 8px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
`;

export default function TodoList({
  todos,
  emptyMessage,
  emptyDescription,
  onToggle,
  onEdit,
  onDelete,
}: TodoListProps) {
  return todos.length === 0 ? (
    // 비어있는 경우
    <Empty>
      <p>{emptyMessage}</p>
      {emptyDescription && <p>{emptyDescription}</p>}
    </Empty>
  ) : (
    
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}
