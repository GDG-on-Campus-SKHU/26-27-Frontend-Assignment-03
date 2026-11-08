import { useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Card, PrimaryButton, TextInput } from '../components/ui';
import type { SignupValues } from '../types';

const Form = styled.form`
  display: grid;
  gap: 16px;
  max-width: 440px;
  margin-top: 24px;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
`;

const Interests = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  border: 1px solid #cdd5e4;
  border-radius: 8px;
`;

const SubmitButton = styled(PrimaryButton)`
  justify-self: start;
`;

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    username: '',
    password: '',
    passwordConfirm: '',
    interest: 'frontend',
    agreed: false,
  });
  const confirmInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    if (name === 'username') {
      event.currentTarget.setCustomValidity('');
    }
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function handleAgreementChange(event: ChangeEvent<HTMLInputElement>) {
    const agreed = event.currentTarget.checked;
    setValues((previous) => ({ ...previous, agreed }));
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.agreed) return;

    if (values.password !== values.passwordConfirm) {
      window.alert('비밀번호가 일치하지 않습니다.');
      confirmInput.current?.focus();
      return;
    }
    // 백틱을 활용한 문구 출력
    window.alert(`${values.username}님, 가입을 환영합니다!`);
    navigate('/todos/all');
  }

  return (
    <Card>
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit}>
        <Field>
          아이디
          <TextInput
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            autoComplete="username"
            required
            pattern="[A-Za-z0-9]{4,12}"
            title="영문과 숫자만 사용해 4~12자로 입력하세요."
            onInvalid={(event) => {
              if (event.currentTarget.validity.patternMismatch) {
                event.currentTarget.setCustomValidity('영문과 숫자만 사용해 4~12자로 입력하세요.');
              }
            }}
            aria-describedby="username-hint"
          />
          <small id="username-hint">영문과 숫자만 사용해 4~12자로 입력하세요.</small>
        </Field>

        <Field>
          비밀번호
          <TextInput
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </Field>

        <Field>
          비밀번호 확인
          <TextInput
            ref={confirmInput}
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </Field>

        <Interests>
          <legend>관심 분야</legend>
          <label>
            <input type="radio" name="interest" value="frontend"
              checked={values.interest === 'frontend'} onChange={handleChange} />
            프론트엔드
          </label>
          <label>
            <input type="radio" name="interest" value="backend"
              checked={values.interest === 'backend'} onChange={handleChange} />
            백엔드
          </label>
        </Interests>

        <label>
          <input type="checkbox" name="agreed"
            checked={values.agreed} onChange={handleAgreementChange} />
          약관에 동의합니다.
        </label>

        <SubmitButton type="submit" disabled={!values.agreed}>가입하기</SubmitButton>
      </Form>
    </Card>
  );
}
