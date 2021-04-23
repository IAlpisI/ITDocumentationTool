import Canvas from './Canvas';
import Palette from './Palette';
import PropertiesPanel from './PropertiesPanel';
import styled, { CSSObject } from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: 250px 20px auto 250px;
    grid-template-rows: 20px auto;
`;

const XCordinates = styled.div`
    overflow: hidden;
    background: black;
    height: 20px;
    width: 100%;
    position: relative;
    grid-area: 1 / 3 / 2 / 4;
`;

const VerticalCords = styled.div`
    color: white;
    width: 100px;
    height: 20px;
    border-left: solid 2px white;
    padding: 5px 0 0 5px;
    overflow: hidden;   
`;

const HorizontalCords = styled.div`
    color: white;
    width: 20px;
    height: 100px;
    border-top: solid 2px white;
    padding: 5px 5px 0 0;
    writing-mode: vertical-lr;
`;

const FillBlock = styled.div`
    background: black;
    grid-area: 1 / 2 / 2 / 3;
`

const RulerX = styled.div<{ offsetx: string, offsety: string }>`
    position: absolute;
    top: ${(props) => props.offsety};
    right: ${(props) => props.offsetx};
    display: flex;
    flex-direction: row;
    overflow: hidden;
`;

const RulerY = styled.div<{ offsetx: string, offsety: string }>`
    position: absolute;
    top: ${(props) => props.offsety};
    right: ${(props) => props.offsetx};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const YCordinates = styled.div`
    background: black;
    position: relative;
    grid-area: 1 / 2 / 3 / 3;
`

const MapIndex = () => {
    let x = 1000;
    let y = 1000;

    let cordsOffsetX = 0;
    let cordsOffsetY = 0;

    return (
        // <Container>
        // <div className='app'>
        <Container>
            <Palette />
            <FillBlock />
            <XCordinates>
                <RulerX offsetx={'-500px'} offsety={'0px'} >
                    {[...Array(12)].map((value, index) => {
                        cordsOffsetX += 100;
                        return <VerticalCords key={index}>{cordsOffsetX}</VerticalCords>;
                    })}
                </RulerX>
            </XCordinates>
            <YCordinates>
                <RulerY offsetx={'0px'} offsety={'100px'} >
                        {[...Array(12)].map((value, index) => {
                            cordsOffsetY += 100;
                            return <HorizontalCords key={index}>{cordsOffsetY}</HorizontalCords>;
                        })}
                </RulerY>
            </YCordinates>
            <Canvas />

            <PropertiesPanel />
        </Container>
        // </div>

        // </Container>
    );
};

export default MapIndex;
