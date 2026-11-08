// UI 디자인을 적용
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

export const Card = styled.section`
  padding: clamp(20px, 5vw, 32px);
  border: 1px solid #e0e5ef;
  border-radius: 18px;
  background: white;
  box-shadow: 0 12px 36px rgb(32 40 61 / 7%);

  h1 {
    margin: 0 0 6px;
    font-size: clamp(24px, 4vw, 34px);
    line-height: 1.2;
    letter-spacing: -0.04em;
  }
`;

const buttonStyle = css`
  display: inline-block;
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid #cdd5e4;
  border-radius: 8px;
  color: #263247;
  background: white;
  text-decoration: none;
  cursor: pointer;
`;

export const Button = styled.button`
  ${buttonStyle}
  &:not(:disabled):hover {
    border-color: #929bc0;
  }

  &:disabled {
    color: #5e687a;
    border-color: transparent;
    background: #eef0f6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  color: white;
  background: #4f46e5;
  border-color: transparent;

  &:not(:disabled):hover {
    background: #4338ca;
  }
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle}
`;

export const TextInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  background: #fcfcff;
  border: 1px solid #cdd5e4;
  border-radius: 8px;
  color: inherit;
`;
