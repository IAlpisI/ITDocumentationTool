import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MaskedInput from 'react-text-mask';

export const Container = styled.div`
    background-color: ${(props) => props.theme.colors.white};
    width: 500px;
    padding: 30px 50px 50px;
    margin: 0 0 50px 100px;
    box-shadow: 0 0 7px ${(props) => props.theme.colors.grey2};
    border-radius: 7px;
`;

export const ButtonLink = styled(Link)`
    /* display:flex; */
`;

export const CheckBox = styled.input`
`

export const ErrorMessage = styled.span`
    font-size: 12px;
    color: red;
    padding-top: 5px;
`;

export const FormSpacingButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 500px;
    margin: 0 0 50px 100px;
`;

export const Select = styled.select`
    padding: 10px;
    width: 65%;
    background-color: ${(props) => props.theme.colors.grey1};
    caret-color: #3600b5;

    &:hover {
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.grey2};
    }
    &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.violet1};
    }
`;

export const TableConfirmationButton = styled.button<{ primary: string }>`
    color: ${(props) =>
        props.primary === 'primary'
            ? props.theme.colors.white
            : props.theme.colors.cyan};
    font-size: 13px;
    background: ${(props) =>
        props.primary === 'primary'
            ? props.theme.colors.cyan
            : props.theme.colors.white};
    padding: 10px 15px;
    outline: none;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    border: 1px solid
        ${(props) =>
            props.primary ? props.theme.colors.white : props.theme.colors.cyan};
    line-height: 1.2;

    & a {
        text-decoration: none;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;
export const ComponentName = styled.div`
    font-size: 30px;
    padding-bottom: 15px;
`;

export const Input = styled.input<{ width?: string }>`
    padding: 10px;
    width: ${(props) => (props.width ? props.width : '65%')};
    background-color: ${(props) => props.theme.colors.grey1};
    caret-color: #3600b5;

    &:hover {
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.grey2};
    }
    &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.violet1};
    }
`;

export const IpInput = styled(MaskedInput)`
    padding: 10px;
    width: ${(props) => (props.width ? props.width : '65%')};
    background-color: ${(props) => props.theme.colors.grey1};
    caret-color: #3600b5;

    &:hover {
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.grey2};
    }
    &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.violet1};
    }
`;

export const FormContainer = styled.div`
    background-color: #f8f9fd;
    width: 100%;
    padding: 20px 50px;
    display: flex;
    flex-flow: row wrap;
`;

export const FormName = styled.div`
    font-size: 30px;
    color: #708188;
    margin: 4px;
`;

export const FormsContainer = styled.div`
    width: 100%;
`;

export const InfoRow = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

export const LinkName = styled.div`
    color: #b6d0f1;
    font-size: 15px;
`;

export const Label = styled.label`
    font-size: 17px;
    color: ${(props) => props.theme.colors.grey3};
    padding: 10px 0;
`;

export const SpyMenu = styled.div`
    position: fixed;
    height: 100px;
    width: 150px;
    top: 40vh;
    right: 10vw;
    z-index: 20000;
`;

export const SpyUl = styled.div``;

export const SpyLi = styled.li`
    list-style: none;
    font-size: 15px;
    padding-left: 10px;
    line-height: 23px;
    margin-bottom: 5px;
    transition: 0.05s all;
`;

export const SpyA = styled.a`
    text-decoration: none;
    color: #000;
`;

export const FormOptions = styled.option`
    &:hover {
        background: ${(props) => props.theme.colors.violet2};
    }
`;
