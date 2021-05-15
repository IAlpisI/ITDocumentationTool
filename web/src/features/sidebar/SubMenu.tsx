import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #132963;
  height: 40px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #343843;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }: any) => {

    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav && item.subNav.map((item:any, index:any) => {
          return (
              <DropdownLink to={item.path} key={index} onClick={showSubnav} >
                  {item.icon}
                  <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
          )
      })}
    </>
  )
}

export default SubMenu
