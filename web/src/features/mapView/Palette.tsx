import styled from 'styled-components';
import ComputerSvg from './Svg/ComputerSvg';

import { DRAG_DATA_KEY, SHAPE_TYPES } from './constants';

const handleDragStart = (event: any) => {
    const type = event.target.dataset.shape;

    if (type) {
        // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;

        // dimensions of the node on the browser
        const clientWidth = event.target.clientWidth;
        const clientHeight = event.target.clientHeight;

        const dragPayload = JSON.stringify({
            type,
            offsetX,
            offsetY,
            clientWidth,
            clientHeight
        });

        event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
    }
};

const ObjectContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ObjectText = styled.div`
    margin: 5px auto;
`;

const PaletteAside = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    grid-area: 1 / 1 /3 / 2;
    border-right: solid 2px #ddd;
`;

const PalleteButton = styled.button`
    padding: 3px 4px;
    margin: 5px 0;
    cursor: pointer;
    background: ${props => props.theme.colors.violet2};
    color: ${props => props.theme.colors.white};
`

const Palette = () => {
    return (
        <PaletteAside>
            <h2>Library</h2>
            {/* <Palete */}
            <ObjectContainer>
                <div
                    className='shape rectangle'
                    data-shape={SHAPE_TYPES.RECT}
                    draggable
                    onDragStart={handleDragStart}
                />
                <ObjectText>Wall</ObjectText>
            </ObjectContainer>

            <ObjectContainer>
                <div
                    // className='shape'
                    // src={"./Svg/computer.svg"}
                    data-shape={SHAPE_TYPES.COMPUTER}
                    draggable
                    onDragStart={handleDragStart}>
                    <ComputerSvg />
                </div>
                <ObjectText>Computer</ObjectText>
            </ObjectContainer>

            <PalleteButton>
                more objects
            </PalleteButton>
            <PalleteButton>
                Center
            </PalleteButton>
            <PalleteButton>
                Save changes
            </PalleteButton>

            {/* <div
                className='shape circle'
                data-shape={SHAPE_TYPES.CIRCLE}
                draggable
                onDragStart={handleDragStart}
            /> */}
        </PaletteAside>
    );
};

export default Palette;
