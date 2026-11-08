import { useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import styled from 'styled-components';
import type { TodoAddFormProps } from '../types';
import { PrimaryButton, TextInput } from './ui';

const Form = styled.form`
  display: flex;
  gap: 8px;

  button {
    flex-shrink: 0;
    min-width: 64px;
  }
`;

export default function TodoAddForm({ onAdd }: TodoAddFormProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // form 제출 함수
  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const newText = text.trim();
    if (newText === '') return;

    onAdd(newText);
    setText('');
    inputRef.current?.focus();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextInput
        ref={inputRef}
        type="text"
        aria-label="새 할 일"
        placeholder="새 할 일을 입력하세요"
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
      />
      <PrimaryButton type="submit" disabled={text.trim() === ''}>추가</PrimaryButton>
    </Form>
  );
}
