import styled from "styled-components"

export const Container = styled.div`
    background-color: ${props => props.theme.colors.white};
    width: 500px;
    padding: 30px 50px 50px;
    margin: 0 0 50px 100px;
    box-shadow: 0 0 5px ${props => props.theme.colors.grey2};
`
export const ComponentName = styled.div`
    font-size: 25px;
    margin-bottom: 20px;
    font-weight: 700;
`

export const ObjectName = styled.div`
    font-weight: 700;
    font-size: 15px;
`

export const ObjectData = styled.div`
    font-size: 15px;
`

export const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 10px 0;
`