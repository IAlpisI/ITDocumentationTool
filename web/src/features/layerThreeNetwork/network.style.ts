import styled from 'styled-components';

export const Container = styled.div`
    height: 500px;
    width: 400px;
    overflow-y: scroll;
    background: ${(props) => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
`;

export const Wrapper = styled.div`
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.violet1};
`

export const ErrorMessage = styled.span`
    padding-right: 20px;
    width: 100px;
    font-size: 12px;
    color: red;
`

export const ItemHeader = styled.div`
    font-weight: 800;
`;

export const Item = styled.div`
    width: 100%;
    height: 30px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: ${props => props.theme.colors.grey1};
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`
export const IpAddressSearchButton = styled.button`
    margin-left: -15px;  
    margin-right: 20px; 
    width: 60px;
    padding: 3px 3px;
    font-size: 13px;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.violet1};
    cursor: pointer;
`

export const IpAddressContainer = styled.div`
    background: ${props => props.theme.colors.white};
    height: 40px;
    width: 62%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 20px 20px 0 50px;
`

export const TableName = styled.div`
    font-size: 25px;
    margin: 20px 0 0 50px;
`

export const IpAddressInput = styled.input`
    width: 150px;
    height: 20px;
    margin-right: 30px;
    background: ${props => props.theme.colors.grey1};
`

export const IpAddressLabel = styled.div`
    margin: 0 10px;
`

export const NetworkInformation = styled.div`
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.colors.white};
    width: 400px;
    margin: 20px;
    padding: 20px;
    height: 250px;
`

export const NetworkInformationName = styled.div`
    font-size: 20px;
    padding-bottom: 15px;
`

export const NetwokrInformationField = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    font-size: 13px;
`

export const CloseButton = styled.button`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.cyan};
  margin-top: 20px;
  width: 70px;
  height: 25px;
  margin-right: 330px;
  cursor: pointer;
`