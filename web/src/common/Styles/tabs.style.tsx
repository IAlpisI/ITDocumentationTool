import styled from 'styled-components';

export const Container = styled.div<{width?: string}>`
    display: flex;
    flex-direction: row;
    max-width: ${(props) => props.width ? props.width : '1800px'};
`;

export const ContentName = styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.grey3};
`;

export const PositionButton = styled.div`
    margin-top: 10px;
    margin-right: 330px;
`;

export const ContentLayout = styled.div<{ width?: string }>`
    width: ${(props) => (props.width ? props.width : '50%')};
    background: ${(props) => props.theme.colors.grey1};
    height: 500px;
    margin: 30px;
    padding: 20px;
`;

export const TableFlow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;