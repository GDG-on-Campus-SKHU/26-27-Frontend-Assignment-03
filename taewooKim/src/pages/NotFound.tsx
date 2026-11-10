import { Link } from 'react-router';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 48px 16px;
  text-align: center;

  a {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #4a7dff;
    color: white;
    text-decoration: none;
    transition: opacity 0.15s;
  }

  a:hover {
    opacity: 0.85;
  }
`;

const Code = styled.p`
  margin: 0;
  font-size: 48px;
  font-weight: bold;
  color: #d1d5db;
`;

const Message = styled.h1`
  margin: 8px 0 24px;
  font-size: 20px;
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Code>404</Code>
      <Message>페이지를 찾을 수 없습니다</Message>
      <Link to="/">홈으로 가기</Link>
    </Wrapper>
  );
}
