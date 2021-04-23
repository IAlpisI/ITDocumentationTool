import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

interface ISidebar {
    readonly sidebar: boolean;
}

const SidebarNav = styled.nav<ISidebar>`
    
    height: 100vh;
    display: flex;
    justify-content: center;
    /* top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; */
    transition: 350ms;
    overflow: hidden;
    z-index: 9999;
    position: sticky;
    top: 0px;
    background: rgb(2,0,36);
background: linear-gradient(343deg, rgba(2,0,36,1) 0%, rgba(72,22,89,1) 27%, rgba(33,10,65,1) 100%);
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
`

const SidebarWrap = styled.div`
    width: 100%;
`;

const SiteField = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    background: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
`

const Sidebar = () => {
    const [sidebar, setSidebar] = useState<boolean>(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <SidebarContainer>
            <SiteField>
                ITool
            </SiteField>
            <IconContext.Provider value={{ color: '#fff' }}>
                {/* <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav> */}
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        {/* <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon> */}
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </SidebarContainer>
    );
};

export default Sidebar;
