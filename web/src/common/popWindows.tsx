import styled from 'styled-components';

const Background = styled.div`
    position: absolute;
    background: #00000070;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const AlignContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
`;

export const DataAcceptWindow = (props: any) => {
    return (
        <Background>
            <AlignContent>{props.children}</AlignContent>
        </Background>
    );
};
