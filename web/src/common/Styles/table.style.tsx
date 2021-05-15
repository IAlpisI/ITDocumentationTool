import styled, {css} from 'styled-components'
import {Link} from 'react-router-dom'

export const TableButtonsRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-direction: row;
    width: 100%;
`
const base = css<{primary:string}>`
    color: ${(props) => props.primary === "primary" ? props.theme.colors.white : props.theme.colors.cyan};
    font-size: 16px;
    background: ${(props) => props.primary === "primary" ? props.theme.colors.cyan : props.theme.colors.white};
    padding: 10px 16px;
    outline: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    margin: 5px;
    outline: 1px solid ${(props) => props.theme.colors.cyan};
    outline-offset: -0px;
`

export const TableButton = styled.div`
    ${base};
`

export const TableLinkButton = styled(Link)`
    ${base};

    &:link {
        text-decoration: none;
    }
`

export const TableSpacingButtons = styled.div`
    display: flex;
`

export const InfoRow = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

export const TableName = styled.div`
    font-size: 40px;
    color: #708188;
    margin: 4px;
`
export const TableContainer = styled.div`
    background: ${props => props.theme.colors.white};
    padding: 30px;
    width: 100%;
    box-shadow: 0 0 25px 0 rgba(154,161,171,0.15);
`

export const Container = styled.div<{padding?: string}>`
    background-color: #f8f9fd;
    width: 100%;
    padding:${props => props.padding ? props.padding : '20px 50px'} ;
    display: flex;
    flex-flow: row wrap;
`

export const LinkName = styled.div`
    color: #b6d0f1;
    font-size: 15px;
`