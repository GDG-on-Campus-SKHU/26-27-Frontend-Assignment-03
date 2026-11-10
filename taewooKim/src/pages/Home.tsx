import { Link } from 'react-router';
import styled from 'styled-components';

const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
`;

const Description = styled.p`
  margin: 0 0 24px;
  color: #6b7280;
  line-height: 1.6;
`;

// Link는 <a> 태그로 그려지므로, Links 안의 a에 스타일을 준다
const Links = styled.div`
  display: flex;
  gap: 8px;

  a {
    flex: 1;
    padding: 12px;
    border: 1px solid #4a7dff;
    border-radius: 10px;
    background-color: #4a7dff;
    color: white;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    transition: opacity 0.15s;
  }

  a:hover {
    opacity: 0.85;
  }
`;

export default function Home() {
  return (
    <section>
      <Title>오늘의 할 일</Title>
      <Description>
        해야 할 일을 적고, 끝낸 일은 체크해 보세요.
        <br />
        작은 일부터 하나씩 완료해 나가면 하루가 가벼워집니다.
      </Description>
      <Links>
        <Link to="/todos">할 일 보러 가기</Link>
        <Link to="/signup">회원가입</Link>
      </Links>
    </section>
  );
}
