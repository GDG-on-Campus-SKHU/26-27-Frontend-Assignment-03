import { Link } from 'react-router';
import styled from 'styled-components';
import type { TodoFilter, TodoFiltersProps } from '../types';

const Tabs = styled.nav`
  display: flex;
  gap: 4px;
  margin-top: 12px;
  padding: 4px;
  border-radius: 12px;
  background: #f0f2f8;
`;

const FilterLink = styled(Link)<{ $selected: boolean }>`
  flex: 1;
  padding: 8px 4px;
  font-size: 14px;
  font-weight: 650;
  border-radius: 8px;
  color: ${({ $selected }) => ($selected ? 'white' : '#344054')};
  background: ${({ $selected }) => ($selected ? '#4f46e5' : 'transparent')};
  text-align: center;
  text-decoration: none;
`;

const filterTabs: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'done', label: '완료' },
];

export default function TodoFilters({ filter }: TodoFiltersProps) {
  return (
    <Tabs aria-label="할 일 상태 필터">
      {filterTabs.map((tab) => (
        <FilterLink
          key={tab.value}
          to={`/todos/${tab.value}`}
          $selected={filter === tab.value}
          aria-current={filter === tab.value ? 'page' : undefined}
        >
          {tab.label}
        </FilterLink>
      ))}
    </Tabs>
  );
}
