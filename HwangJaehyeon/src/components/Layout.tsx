import { NavLink, Outlet } from 'react-router';
import styled from 'styled-components';

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e0e5ef;
`;

const Menu = styled.nav`
  display: flex;
  gap: 8px;
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 14px 0;
`;

const MenuLink = styled(NavLink)`
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  color: #455068;
  text-decoration: none;

  &:hover {
    background: #f5f6fb;
  }

  &[aria-current='page'] {
    color: #4338ca;
    background: #eef0ff;
    font-weight: 700;
  }
`;

const Content = styled.main`
  width: min(900px, calc(100% - 32px));
  margin: clamp(20px, 5vw, 52px) auto;
`;

export default function Layout() {
  return (
    <>
      <Header>
        <Menu aria-label="주 메뉴">
          <MenuLink to="/" end>홈</MenuLink>
          <MenuLink to="/todos">할 일</MenuLink>
          <MenuLink to="/signup">회원가입</MenuLink>
        </Menu>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
