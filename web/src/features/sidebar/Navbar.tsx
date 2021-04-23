import styled from 'styled-components';

const Nav = styled.div`
    background: ${(props) => props.theme.colors.white};
    height: 55px;
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

function Navbar() {
    return (
        <Nav>
            <Wrapper>
                <SearchBar placeholder='Search...' />
                <SearchButton>
                    {/* <SearchIcon /> */}
                    Search
                </SearchButton>
            </Wrapper>
            <UserInfoWrapper>
                {/* <UserName>{localStorage.getItem('name') || 'nieko'}</UserName> */}
                <UserName>Tomas</UserName>
                <UserRole>{localStorage.getItem('role') || 'nieko'}</UserRole>
            </UserInfoWrapper>
        </Nav>
    );
}

export default Navbar;
