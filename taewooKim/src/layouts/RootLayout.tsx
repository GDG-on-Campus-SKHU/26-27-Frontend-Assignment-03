import { NavLink, Outlet } from 'react-router';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;

const Logo = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #4a7dff;
`;

// NavLink는 <a> 태그로 그려지므로, Nav 안의 a와 a.active에 스타일을 준다
const Nav = styled.nav`
  display: flex;
  gap: 4px;

  a {
    padding: 6px 12px;
    border-radius: 6px;
    color: #4b5563;
    text-decoration: none;
    transition: background-color 0.15s, color 0.15s;
  }

  a:hover {
    background-color: #eef2ff;
  }

  a.active {
    background-color: #4a7dff;
    color: white;
    font-weight: bold;
  }
`;

const Main = styled.main`
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 16px;
`;

export default function RootLayout() {
  return (
    <>
      <Header>
        <Logo>오늘의 할 일</Logo>
        <Nav>
          {/* end: '/'는 모든 경로의 앞부분이라, 정확히 '/'일 때만 활성으로 표시한다 */}
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            홈
          </NavLink>
          {/* end가 없으므로 /todos/all, /todos/active, /todos/done 모두 활성으로 표시된다 */}
          <NavLink to="/todos" className={({ isActive }) => (isActive ? 'active' : '')}>
            할 일
          </NavLink>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
            회원가입
          </NavLink>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
