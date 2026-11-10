import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font: inherit;
  transition: border-color 0.15s;

  &:focus {
    border-color: #4a7dff;
    outline: none;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background-color: #4a7dff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background-color: #3366e6;
  }

  &:disabled {
    background-color: #c7d4f5;
    cursor: not-allowed;
  }
`;

interface TodoAddFormProps {
  onAdd: (text: string) => void;
}

export default function TodoAddForm({ onAdd }: TodoAddFormProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === '') return;

    onAdd(text);
    setText('');
    inputRef.current?.focus(); // 추가한 뒤에도 바로 다음 할 일을 입력할 수 있도록
  };

  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        type="text"
        id="new-todo"
        aria-label="새로운 할 일"
        placeholder="새로운 할 일을 입력하세요."
        value={text}
        onChange={handleChange}
      />
      <AddButton type="submit" disabled={text.trim() === ''}>
        추가
      </AddButton>
    </Form>
  );
}
