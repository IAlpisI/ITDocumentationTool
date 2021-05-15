import Canvas from './canvas';
import Palette from './palette';
import PropertiesPanel from './propertiesPanel';
import styled from 'styled-components';
import MapGallery from './mapGallery';
import { useRef, useState } from 'react';

const Container = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 250px 20px auto 250px;
    grid-template-rows: 20px auto 75px;
`;

const XCordinates = styled.div`
    overflow: hidden;
    background: black;
    position: relative;
    grid-area: 1 / 3 / 2 / 4;
`;

const VerticalCords = styled.div`
    font-size: 12px;
    color: ${props => props.theme.colors.white};
    width: 100px;
    height: 20px;
    border-left: solid 2px ${props => props.theme.colors.white};
    padding: 5px 0 0 5px;
`;

const HorizontalCords = styled.div`
    font-size: 12px;
    color: ${props => props.theme.colors.white};
    width: 20px;
    height: 100px;
    border-top: solid 2px ${props => props.theme.colors.white};
    padding: 5px 5px 0 0;
    writing-mode: vertical-lr;
`;

const FillBlock = styled.div`
    background: black;
    grid-area: 1 / 2 / 2 / 3;
`;

const BottomFiller = styled.div`
    background: ${props => props.theme.colors.grey2};
    grid-area: 3 / 2 / 4 / 4;
`

const RulerX = styled.div<{ offsetx: string; offsety: string; width: string }>`
    width: ${(props) => props.width};
    position: absolute;
    top: ${(props) => props.offsety};
    right: ${(props) => props.offsetx};
    display: flex;
    flex-direction: row;
`;

const RulerY = styled.div<{ offsetx: string; offsety: string; height: string }>`
    width: 100%;
    position: absolute;
    height:${(props) => props.height};
    top: ${(props) => props.offsety};
    right: ${(props) => props.offsetx};
    display: flex;
    flex-direction: column;
`;

const YCordinates = styled.div`
    background: black;
    position: relative;
    grid-area: 2 / 2 / 3 / 3;
    overflow: hidden;
`;

export interface IMap {
    isActive: boolean;
    title: string;
    sizeX: number;
    sizeY: number;
}

const MapIndex = () => {

    let cordsOffsetX = -100;
    let cordsOffsetY = -100;

    let [Map, setMap] = useState<IMap>({
        isActive: false,
        title: 'mainRoom',
        sizeX: 4000,
        sizeY: 4000
    });
    const stageRef = useRef<any>(null);
    const cordinatesXRef = useRef<any>(null);
    const cordinatesYRef = useRef<any>(null);

    const mapSwap = (title: string, x: string, y: string) => {
        setMap((Map) => ({
            // ...Map,
            title: title,
            sizeX: parseInt(x),
            sizeY: parseInt(y),
            isActive: !Map.isActive
        }));
    };

    const backToGallery = () => {
        setMap((Map) => ({
            ...Map,
            isActive: false
        }))
    }

    return (
        <>
            {Map.isActive ? (
                <Container>
                    <Palette
                        backToGallery={backToGallery}
                        title={Map.title}
                        sizeX={Map.sizeX}
                        sizeY={Map.sizeY}
                        stageRef={stageRef}
                    />
                    <FillBlock />
                    <BottomFiller />
                    <XCordinates>
                        <RulerX width={`${Map.sizeX+100}px`} offsetx={'0px'} offsety={'0px'} ref={cordinatesXRef}>
                            {[...Array((Map.sizeX/100)+1)].map((_, index) => {
                                cordsOffsetX += 100;
                                return (
                                    <VerticalCords key={index}>
                                        {cordsOffsetX}
                                    </VerticalCords>
                                );
                            })}
                        </RulerX>
                    </XCordinates>
                    <YCordinates>
                        <RulerY height={`${Map.sizeY+100}px`} offsetx={'0px'} offsety={'100px'} ref={cordinatesYRef}>
                            {[...Array((Map.sizeY/100)+1)].map((_, index) => {
                                cordsOffsetY += 100;
                                return (
                                    <HorizontalCords key={index}>
                                        {cordsOffsetY}
                                    </HorizontalCords>
                                );
                            })}
                        </RulerY>
                    </YCordinates>

                    <Canvas
                        title={Map.title}
                        sizeX={Map.sizeX}
                        sizeY={Map.sizeY}
                        stageRef={stageRef}
                        cordinatesXRef={cordinatesXRef}
                        cordinatesYRef={cordinatesYRef}
                    />

                    <PropertiesPanel />
                </Container>
            ) : (
                <MapGallery Map={Map} mapSwap={mapSwap}  />
            )}
        </>
    );
};

export default MapIndex;
