import styled from 'styled-components'

export const Button = styled.button<{height?: string,paddingBottom?: string, width?: string, color?: string, background?: boolean, fontSize?:string, padding?:string, margin?:string}>`
    height: ${props => props.height};
    width: ${props => props.width};
    color: ${props => props.theme.colors.white};
    background: ${props => props.background ? props.theme.colors.cyan : props.theme.colors.red};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    padding-bottom: ${props => props.paddingBottom};
    font-size: ${props => props.fontSize};
    text-transform: uppercase;
    cursor: pointer;
`