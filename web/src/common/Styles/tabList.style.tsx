import styled from 'styled-components'

export const Container = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
`
export const ContetnName =styled.div`
    font-size: 20px;
`

export const ContentLayout = styled.div<{width?: string}>`
    width: ${props =>props.width ? props.width : '100%'};
    background: ${(props) => props.theme.colors.grey1};
    height: 500px;
    margin: 30px;
    padding: 20px;
`

export const TableFlow = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
`