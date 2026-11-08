import { ButtonLink, Card } from '../components/ui';

export default function NotFoundPage() {
  return (
    <Card>
      <h1>404 · 페이지를 찾을 수 없어요</h1>
      <p>주소를 확인하거나 홈으로 돌아가 주세요.</p>
      <ButtonLink to="/">홈으로 가기</ButtonLink>
    </Card>
  );
}
