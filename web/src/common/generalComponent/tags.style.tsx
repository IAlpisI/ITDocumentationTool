import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

export const TagInput = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 65%;
    border-radius: 6px;

    input {
        flex: 1;
        border: none;
        height: 37px;
        font-size: 14px;
        background: ${(props) => props.theme.colors.grey1};
        padding: 10px;

        &:hover {
            box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.grey2};
        }
        &:focus {
            outline: 0;
            box-shadow: inset 0 0 0 1.5px ${(props) => props.theme.colors.violet1};
        }
    }
`;
export const Tag = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    li {
        width: auto;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.colors.white};
        padding: 0 8px;
        font-size: 14px;
        list-style: none;
        border-radius: 6px;
        margin: 0 8px 8px 0;
        background: ${(props) => props.theme.colors.violet2}
    }
`;

export const CloseIcon = styled.span`
    display: block;
    width: 16px;
    height: 16px;
    font-size: 16px;
    margin-left: 8px;
    color: ${(props) => props.theme.colors.violet2};
    border-radius: 50%;
    background: ${(props) => props.theme.colors.white};
    cursor: pointer;
`;


export const StyledCloseIcon = styled(ClearIcon)`
    color: ${(props) => props.theme.colors.violet2};
    padding: 0 8px 7px 0;
`