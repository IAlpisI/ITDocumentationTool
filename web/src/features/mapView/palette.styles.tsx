import styled from 'styled-components';

export const ObjectContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100px;
    height: 350px;
    width: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
    background: ${(props) => props.theme.colors.white};
    margin: 10px 0;
`;

export const ObjectWrap = styled.div`
    padding: 10px;
`;

export const ObjectText = styled.button`
    width: 200px;
    height: 30px;
    margin: 5px auto;
    cursor: pointer;
    background: ${(props) => props.theme.colors.cyan};
    color: ${(props) => props.theme.colors.white};
`;

export const PaletteAside = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    grid-area: 1 / 1 / 4 / 2;
    border-right: solid 2px #ddd;
`;

export const PalleteButton = styled.button`
    width: 200px;
    height: 30px;
    padding: 3px 4px;
    margin: 5px 0;
    cursor: pointer;
    background: ${(props) => props.theme.colors.violet1};
    color: ${(props) => props.theme.colors.white};
`;

export const PalleteLabel = styled.div`
    font-weight: 800;
    font-size: 25px;
`;

export const PalleteObjectLabel = styled.div`
    font-size: 10px;
    display: flex;
    justify-content: center;
`
