import styled from 'styled-components';
import type { TodoSummaryProps } from '../types';
import { Button } from './ui';

const Summary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 24px;
  color: #566173;
  font-size: 14px;
`;

// 정렬의 경우, 총 목록 개수가 1개라면 disabled 되게 구현함
export default function TodoSummary({ totalCount, doneCount, onSort }: TodoSummaryProps) {
  return (
    <Summary>
      <span>전체 {totalCount}개 / 완료 {doneCount}개</span>
      <Button type="button" onClick={onSort} disabled={totalCount < 2}>
        이름순 정렬
      </Button>
    </Summary>
  );
}
