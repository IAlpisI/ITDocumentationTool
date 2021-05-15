import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    background: ${(props) => props.theme.colors.white};
    min-height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    z-index: 10;
    border-bottom: 1.5px solid ${(props) => props.theme.colors.grey1};
`;

const Wrapper = styled.div`
    display: flex;
    margin-left: 50px;
`;

const SearchBar = styled.input`
    border: none;
    outline: none;
    width: 200px;
    padding: 10px;
    background: #f1f3fa;
`;

const SearchButton = styled.button`
    display: flex;
    color: #fff;
    background: #632ce4;
    padding: 10px 10px;
    font-size: 15px;
    border: none;
    cursor: pointer;
`;

const UserInfoWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    cursor: pointer;
`;
const UserName = styled.div`
    font-size: 20px;
`;

const UserRole = styled.div`
    font-size: 10px;
`;

const DropDown = styled.div`
    position: absolute;
    top: 40px;
    right: -30px;
    border: 1px solid ${(props) => props.theme.colors.grey1};
    z-index: 999;
`;

const DropDownMenu = styled.div`
    padding: 5px;
    height: 110px;
    width: 150px;
    background: ${(props) => props.theme.colors.white};
`;

const DropDownItem = styled.div`
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    margin: 5px;
    z-index: 1000;

    &:hover {
        background: ${(props) => props.theme.colors.violet2};
        color: ${(props) => props.theme.colors.white};
    }
`;

function Navbar() {
    let history = useHistory();
    const [hoverMenu, setHoverMenu] = useState<boolean>(false);

    const logout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('role');

        history.push('/login');
    };

    const toggleHoverMenu = (state: boolean) => {
        setHoverMenu((hoverMenu) => state);
    };

    return (
        <Nav>
            <Wrapper>
                <SearchBar placeholder='Search...' />
                <SearchButton>Search</SearchButton>
            </Wrapper>
            <UserInfoWrapper>
                <UserName
                    onMouseOver={() => {
                        toggleHoverMenu(true);
                    }}>
                    {localStorage.getItem('name') || ''}
                </UserName>
                <UserRole>{localStorage.getItem('role') || ''}</UserRole>
                <DropDown
                    onMouseLeave={() => {
                        toggleHoverMenu(false);
                    }}>
                    {hoverMenu && (
                        <DropDownMenu>
                            <DropDownItem>Create users</DropDownItem>
                            <DropDownItem onClick={logout}>Logout</DropDownItem>
                        </DropDownMenu>
                    )}
                </DropDown>
            </UserInfoWrapper>
        </Nav>
    );
}

export default Navbar;
