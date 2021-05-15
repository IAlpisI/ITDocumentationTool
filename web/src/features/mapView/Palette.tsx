import ComputerSvg from './svg/computerSvg';
import { SvgPrinter, SvgRouter, SvgSwitch } from '../networkDiagram/svgs';
import { DRAG_DATA_KEY, SHAPE_TYPES } from './constants';
import { useDispatch } from 'react-redux';
import { saveDiagram } from './stateSlice';
import { useState } from 'react';
import * as Module from './palette.styles';
import { DoorSvg, TableSvg, WallSvg, WindowSvg } from './svg/doorSvg';

const handleDragStart = (event: any, id?:number, ) => {
    const type = event.target.dataset.shape;

    if (type) {
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;

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

interface Library {
    officeObjects: boolean;
    clients: boolean;
    printers: boolean;
    routers: boolean;
    switches: boolean;
    servers: boolean;
}

const Palette = (props: any) => {
    const dispatch = useDispatch();

    const [showObjects, setObjects] = useState<Library>({
        officeObjects: false,
        clients: false,
        printers: false,
        routers: false,
        switches: false,
        servers: false
    });

    const showObject = (field: keyof Library) => {
        setObjects(() => ({
            officeObjects: false,
            clients: false,
            printers: false,
            routers: false,
            switches: false,
            servers: false
        }));

        const current = !showObjects[field];

        switch (field.toString()) {
            case 'clients':
                setObjects((showObjects) => ({
                    ...showObjects,
                    clients: current
                }));
                break;
            case 'printers':
                setObjects((showObjects) => ({
                    ...showObjects,
                    printers: current
                }));
                break;
            case 'officeObjects':
                setObjects((showObjects) => ({
                    ...showObjects,
                    officeObjects: current
                }));
                break;
            case 'switches':
                setObjects((showObjects) => ({
                    ...showObjects,
                    switches: current
                }));
                break;
            case 'routers':
                setObjects((showObjects) => ({
                    ...showObjects,
                    routers: current
                }));
                break;
            default:
                break;
        }
    };

    return (
        <Module.PaletteAside>
            <Module.PalleteLabel>Library</Module.PalleteLabel>

            <Module.ObjectText
                onClick={() => {
                    showObject('officeObjects');
                }}>
                Office items
            </Module.ObjectText>
            {showObjects.officeObjects && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.WALL}
                        draggable
                        onDragStart={handleDragStart}>
                        <WallSvg />
                        <Module.PalleteObjectLabel>
                            Wall
                        </Module.PalleteObjectLabel>
                    </Module.ObjectWrap>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.DOORS}
                        draggable
                        onDragStart={handleDragStart}>
                        <DoorSvg />
                        <Module.PalleteObjectLabel>
                            Doors
                        </Module.PalleteObjectLabel>
                    </Module.ObjectWrap>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.TABLE}
                        draggable
                        onDragStart={handleDragStart}>
                        <TableSvg />
                        <Module.PalleteObjectLabel>
                            Table
                        </Module.PalleteObjectLabel>
                    </Module.ObjectWrap>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.WINDOW}
                        draggable
                        onDragStart={handleDragStart}>
                        <WindowSvg />
                        <Module.PalleteObjectLabel>
                            Window
                        </Module.PalleteObjectLabel>
                    </Module.ObjectWrap>
                </Module.ObjectContainer>
            )}

            <Module.ObjectText
                onClick={() => {
                    showObject('clients');
                }}>
                Clients
            </Module.ObjectText>
            {showObjects.clients && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.COMPUTER}
                        draggable
                        onDragStart={handleDragStart}>
                        <ComputerSvg />
                    </Module.ObjectWrap>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.COMPUTER}
                        draggable
                        onDragStart={handleDragStart}>
                        <ComputerSvg />
                        <Module.PalleteObjectLabel>
                            Client1
                        </Module.PalleteObjectLabel>
                    </Module.ObjectWrap>
                </Module.ObjectContainer>
            )}

            <Module.ObjectText
                onClick={() => {
                    showObject('printers');
                }}>
                Printers
            </Module.ObjectText>
            {showObjects.printers && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.PRINTER}
                        draggable
                        onDragStart={handleDragStart}>
                        <SvgPrinter circle={false} />
                    </Module.ObjectWrap>
                </Module.ObjectContainer>
            )}

            <Module.ObjectText
                onClick={() => {
                    showObject('routers');
                }}>
                Routers
            </Module.ObjectText>
            {showObjects.routers && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.ROUTER}
                        draggable
                        onDragStart={handleDragStart}>
                        <SvgRouter rectangle={false} />
                    </Module.ObjectWrap>
                </Module.ObjectContainer>
            )}

            <Module.ObjectText
                onClick={() => {
                    showObject('switches');
                }}>
                Switches
            </Module.ObjectText>
            {showObjects.switches && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.SWITCH}
                        draggable
                        onDragStart={handleDragStart}>
                        <SvgSwitch rectangle={false} />
                    </Module.ObjectWrap>
                </Module.ObjectContainer>
            )}

            <Module.ObjectText>Servers</Module.ObjectText>

            <Module.PalleteButton
                onClick={() => {
                    props.stageRef.current.position({ x: 0, y: 0 });
                }}>
                Reset view
            </Module.PalleteButton>
            <Module.PalleteButton onClick={props.backToGallery}>
                Back
            </Module.PalleteButton>
            <Module.PalleteButton
                onClick={() => {
                    dispatch(saveDiagram({ props }));
                }}>
                Save changes
            </Module.PalleteButton>
        </Module.PaletteAside>
    );
};

export default Palette;
