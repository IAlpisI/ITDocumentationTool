import styled from 'styled-components';

export const Container = styled.div`
    height: 88vh;
`;

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 0 0 5px;
`;

export const Label = styled.div`
    width: auto;
    height: 20px;
    background: ${(props) => props.theme.colors.white};
    margin-top: 5px;
    display: flex;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.colors.grey3};
`;

export const DiagramContainer = styled.div`
    display: grid;
    grid-template-columns: auto 300px;
`;

export const NetworkDiagram = styled.div`
    background: ${(props) => props.theme.colors.grey1};
`;

export const NetworkInformationConatainer = styled.div`
    background: ${(props) => props.theme.colors.white};
`;

export const DisplayInfo = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: repeat(7, 50px);
    /* grid-template-rows: */
`;

export const DisplayInfoName = styled.div`
    grid-area: 1 / 1 / 2 / 3;
    display: flex;
    justify-content: center;
`;

export const DisplayInforLabel = styled.div`
    font-size: 15px;
`;

export const DisplayInfoValue = styled.div`
    font-size: 15px;
`;

export const DiagramName = styled.div`
    margin: 10px;
    font-size: 25px;
    color: ${(props) => props.theme.colors.grey3};
`;

export const Button = styled.button`
    width: 100px;
    height: 30px;
    padding: 0 5px;
    font-size: 11px;
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.cyan};
    cursor: pointer;
    text-transform: uppercase;
`