import styled from 'styled-components';

export const Content = styled.div`
    margin: 0 20px;
`;

export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 50px 150px 280px 280px;
    gap: 20px;
`;

export const Container = styled.div<{ area: string; color: string }>`
    background: ${(props) => props.theme.colors.white};
    grid-area: ${(props) => props.area};
    background: ${(props) => props.color};
    border-radius: 10px;
`;

export const TableContainerContent = styled.div<{ area: string; color: string }>`
    grid-area: ${(props) => props.area};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const TableName = styled.div`
    font-size: 20px;
    color: ${(props) => props.theme.colors.grey3};
`;

export const ContentLabel = styled.div<{ area: string }>`
    grid-area: ${(props) => props.area};
    font-size: 30px;
    padding-top: 20px;
`;

export const CardContent = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: auto 80px;
    grid-template-rows: 75% 25%;
`;

export const CardText = styled.div`
    color: ${(props) => props.theme.colors.white};
    font-size: 25px;
    padding: 40px 20px 20px 20px;
`;

export const CardNumber = styled.div`
    color: ${(props) => props.theme.colors.white};
    font-size: 25px;
    padding: 40px 0 20px 0;
`;

export const CardDetails = styled.div<{ color?: string }>`
    color: ${(props) => props.theme.colors.white};
    grid-area: 2 / 1 / 3 / 3;
    cursor: pointer;
    background: ${(props) => props.color};
    font-size: 13px;
    padding: 10px 10px 10px 20px;
`;