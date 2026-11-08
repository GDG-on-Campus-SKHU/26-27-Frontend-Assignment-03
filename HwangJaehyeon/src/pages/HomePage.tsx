import styled from 'styled-components';
import { ButtonLink, Card } from '../components/ui';

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
`;

export default function HomePage() {
  return (
    <Card>
      <h1>오늘의 할 일</h1>
      <p>할 일을 정리하고 작은 일부터 하나씩 완료해 보세요.</p>
      <Links>
        <ButtonLink to="/todos/all">할 일 보러 가기</ButtonLink>
        <ButtonLink to="/signup">회원가입</ButtonLink>
      </Links>
    </Card>
  );
}
