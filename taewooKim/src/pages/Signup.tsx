import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import styled, { css } from 'styled-components';

const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 28px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #374151;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  transition: border-color 0.15s;

  &:focus {
    border-color: #4a7dff;
    outline: none;
  }
`;

const Hint = styled.span`
  font-size: 13px;
  color: #9ca3af;
`;

const Fieldset = styled.fieldset`
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;
  border: none;

  legend {
    margin-bottom: 6px;
    padding: 0;
    font-weight: bold;
    color: #374151;
  }
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const SubmitButton = styled.button<{ $active: boolean }>`
  padding: 12px;
  border: none;
  border-radius: 10px;
  background-color: #c4c8cf;
  color: white;
  font-weight: bold;
  cursor: not-allowed;
  transition: background-color 0.15s;

  ${({ $active }) =>
    $active &&
    css`
      background-color: #4a7dff;
      cursor: pointer;

      &:hover {
        background-color: #3366e6;
      }
    `}
`;

const initialFormState = {
  userId: '',
  password: '',
  passwordConfirm: '',
  field: 'frontend',
  agree: false,
};

export default function Signup() {
  // 모든 입력값을 객체 상태 하나로 관리한다 (키 = 입력 요소의 name)
  const [formState, setFormState] = useState(initialFormState);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 텍스트·비밀번호·라디오는 이 핸들러 하나로 처리한다
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 체크박스는 value가 아니라 checked를 읽는다
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  // 아이디·비밀번호 형식은 브라우저가 먼저 검사하므로, 여기까지 왔다면 이미 통과한 상태다
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.password !== formState.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      passwordConfirmRef.current?.focus();
      return;
    }
    alert(`${formState.userId}님, 가입을 환영합니다!`);
    navigate('/todos/all');
  };

  return (
    <section>
      <Title>회원가입</Title>
      <Form onSubmit={submitHandler}>
        <Field>
          <Label htmlFor="userId">아이디</Label>
          <Input
            type="text"
            id="userId"
            name="userId"
            placeholder="영문, 숫자 4~12자"
            value={formState.userId}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={12}
            pattern="[A-Za-z0-9]+"
            title="4~12자의 영문과 숫자만 사용할 수 있습니다."
          />
        </Field>

        <Field>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="8자 이상"
            value={formState.password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </Field>

        <Field>
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            ref={passwordConfirmRef}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 한 번 더 입력하세요."
            value={formState.passwordConfirm}
            onChange={handleChange}
            required
          />
        </Field>

        <Fieldset>
          <legend>관심 분야</legend>
          <OptionLabel>
            <input
              type="radio"
              name="field"
              value="frontend"
              checked={formState.field === 'frontend'}
              onChange={handleChange}
            />
            프론트엔드
          </OptionLabel>
          <OptionLabel>
            <input
              type="radio"
              name="field"
              value="backend"
              checked={formState.field === 'backend'}
              onChange={handleChange}
            />
            백엔드
          </OptionLabel>
        </Fieldset>

        <Field>
          <OptionLabel htmlFor="agree">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formState.agree}
              onChange={handleCheckboxChange}
            />
            이용약관에 동의합니다.
          </OptionLabel>
          {!formState.agree && <Hint>약관에 동의해야 가입할 수 있어요.</Hint>}
        </Field>

        <SubmitButton type="submit" $active={formState.agree} disabled={!formState.agree}>
          가입하기
        </SubmitButton>
      </Form>
    </section>
  );
}
