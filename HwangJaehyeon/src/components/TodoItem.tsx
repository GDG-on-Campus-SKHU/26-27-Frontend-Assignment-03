import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import styled from 'styled-components';
import type { TodoItemProps } from '../types';
import { Button, PrimaryButton, TextInput } from './ui';

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #e0e5ef;
  border-radius: 10px;
`;

const ToggleButton = styled(Button)<{ $done: boolean }>`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  color: ${({ $done }) => ($done ? 'white' : 'inherit')};
  background: ${({ $done }) => ($done ? '#4f46e5' : 'white')};
`;

const TodoText = styled.span<{ $done: boolean }>`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  color: ${({ $done }) => ($done ? '#667085' : 'inherit')};
  text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
`;

const EditForm = styled.form`
  display: flex;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px;

  input {
    flex: 1 1 120px;
    width: auto;
  }
`;

const DeleteButton = styled(Button)`
  color: #b42318;
`;

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');

  // 수정으로 상태가 변경되는 것을 처리하는 함수
  function handleStartEdit() {
    setDraft(todo.text);
    setIsEditing(true);
  }

  function handleSave(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();
    if (text === '') return;

    onEdit(todo.id, text);
    setIsEditing(false);
  }

  return (
    <Item>
      <ToggleButton
        type="button"
        $done={todo.done}
        aria-label={`${todo.text} 완료 상태`}
        aria-pressed={todo.done}
        onClick={() => onToggle(todo.id)}
      >
        {todo.done ? '*' : ''}
      </ToggleButton>

      {isEditing ? (
        <EditForm onSubmit={handleSave}>
          <TextInput
            type="text"
            aria-label="할 일 수정"
            autoFocus
            value={draft}
            onChange={(event) => setDraft(event.currentTarget.value)}
          />
          <PrimaryButton type="submit">저장</PrimaryButton>
          <Button type="button" onClick={() => setIsEditing(false)}>취소</Button>
        </EditForm>
      ) : (
        <>
          <TodoText $done={todo.done}>{todo.text}</TodoText>
          <Button type="button" onClick={handleStartEdit}>수정</Button>
        </>
      )}

      <DeleteButton type="button" onClick={() => onDelete(todo.id)}>삭제</DeleteButton>
    </Item>
  );
}
