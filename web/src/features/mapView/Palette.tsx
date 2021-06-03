import ComputerSvg from './svg/computerSvg';
import { SvgPrinter, SvgRouter, SvgSwitch } from '../networkDiagram/svgs';
import { DRAG_DATA_KEY, SHAPE_TYPES } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { saveDiagram } from './stateSlice';
import { useEffect, useState } from 'react';
import * as Module from './palette.styles';
import { DoorSvg, TableSvg, WallSvg, WindowSvg } from './svg/doorSvg';
import { Server } from './svg/computerSvg';
import { fetchClients } from '../clientPc/clientPcSlice';
import { fetchPrinters } from '../printer/printerSlice';
import { fetchServers } from '../serverDevice/serverSlice';
import { fetchRouters } from '../routerDevice/routerSlice';
import { fetchSwitches } from '../switchDevice/switchSlice';

import { DataAcceptWindow } from '../../common/popWindows';
import { FormButtons, FormName, Form } from './mapGallery';
import { Button } from '../../common/Styles/common.style';

const handleDragStart = (event: any, deviceId?: number) => {
    console.log(deviceId);
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
            clientHeight,
            deviceId
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
    const clientList = useSelector(
        (state: any) => state.client.clientList.data
    );
    const printerList = useSelector(
        (state: any) => state.printer.printerList.data
    );
    const serverList = useSelector(
        (state: any) => state.server.serverList.data
    );
    const routerList = useSelector(
        (state: any) => state.router.routerList.data
    );
    const switchList = useSelector(
        (state: any) => state.switch.switchList.data
    );

    const [showObjects, setObjects] = useState<Library>({
        officeObjects: false,
        clients: false,
        printers: false,
        routers: false,
        switches: false,
        servers: false
    });

    const [save, setSave] = useState<boolean>(false);
    const [popup, setPopup] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchSwitches());
        dispatch(fetchRouters());
        dispatch(fetchClients());
        dispatch(fetchPrinters());
        dispatch(fetchServers());
    }, [dispatch]);

    const tootglePopWindow = () => {
        setPopup((popup) => !popup);
    };

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
            case 'servers':
                setObjects((showObjects) => ({
                    ...showObjects,
                    servers: current
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
                    {clientList &&
                        clientList.map((x: any, index: number) => (
                            <Module.ObjectWrap
                                key={index}
                                data-shape={SHAPE_TYPES.COMPUTER}
                                draggable
                                onDragStart={(e) => {
                                    handleDragStart(e, x.id);
                                }}>
                                <ComputerSvg />
                                <Module.PalleteObjectLabel>
                                    {x.title}
                                </Module.PalleteObjectLabel>
                            </Module.ObjectWrap>
                        ))}
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
                        <SvgPrinter circle={false} color={'black'} />
                    </Module.ObjectWrap>
                    {printerList &&
                        printerList.map((x: any, index: number) => (
                            <Module.ObjectWrap
                                key={index}
                                data-shape={SHAPE_TYPES.PRINTER}
                                draggable
                                onDragStart={(e) => {
                                    handleDragStart(e, x.id);
                                }}>
                                <SvgPrinter circle={false} color={'black'} />
                                <Module.PalleteObjectLabel>
                                    {x.title}
                                </Module.PalleteObjectLabel>
                            </Module.ObjectWrap>
                        ))}
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
                    {routerList &&
                        routerList.map((x: any, index: number) => (
                            <Module.ObjectWrap
                                key={index}
                                data-shape={SHAPE_TYPES.ROUTER}
                                draggable
                                onDragStart={(e) => {
                                    handleDragStart(e, x.id);
                                }}>
                                <SvgRouter rectangle={false} />
                                <Module.PalleteObjectLabel>
                                    {x.title}
                                </Module.PalleteObjectLabel>
                            </Module.ObjectWrap>
                        ))}
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
                        <SvgSwitch rectangle={false} color={'black'} />
                    </Module.ObjectWrap>
                    {switchList &&
                        switchList.map((x: any, index: number) => {
                            console.log(x);
                            return (
                                <Module.ObjectWrap
                                    key={index}
                                    data-shape={SHAPE_TYPES.SWITCH}
                                    draggable
                                    onDragStart={(e) => {
                                        handleDragStart(e, x.id);
                                    }}>
                                    <SvgSwitch
                                        rectangle={false}
                                        color={'black'}
                                    />
                                    <Module.PalleteObjectLabel>
                                        {x.title}
                                    </Module.PalleteObjectLabel>
                                </Module.ObjectWrap>
                            );
                        })}
                </Module.ObjectContainer>
            )}

            <Module.ObjectText
                onClick={() => {
                    showObject('servers');
                }}>
                Servers
            </Module.ObjectText>
            {showObjects.servers && (
                <Module.ObjectContainer>
                    <Module.ObjectWrap
                        data-shape={SHAPE_TYPES.SERVER}
                        draggable
                        onDragStart={handleDragStart}>
                        <Server />
                    </Module.ObjectWrap>
                    {serverList &&
                        serverList.map((x: any, index: number) => (
                            <Module.ObjectWrap
                                key={index}
                                data-shape={SHAPE_TYPES.SERVER}
                                draggable
                                onDragStart={(e) => {
                                    handleDragStart(e, x.id);
                                }}>
                                <Server />
                                <Module.PalleteObjectLabel>
                                    {x.title}
                                </Module.PalleteObjectLabel>
                            </Module.ObjectWrap>
                        ))}
                </Module.ObjectContainer>
            )}

            <Module.PalleteButton
                onClick={() => {
                    props.stageRef.current.position({ x: 0, y: 0 });
                }}>
                Reset view
            </Module.PalleteButton>
            <Module.PalleteButton onClick={tootglePopWindow}>
                Back
            </Module.PalleteButton>
            <Module.PalleteButton
                onClick={() => {
                    dispatch(saveDiagram({ props }));
                    setSave((save) => true);
                    setTimeout(function () {
                        setSave((save) => false);
                    }, 1000);
                }}>
                Save changes
            </Module.PalleteButton>
            {save && <Module.SaveMessage>Saved</Module.SaveMessage>}
            {popup && (
                <DataAcceptWindow>
                    <Form>
                        <FormName>Are you sure you want to leave?</FormName>
                        <FormButtons>
                            <Button
                                height='30px'
                                width='70px'
                                padding='0 10px'
                                background
                                margin='110px 0 0 0'
                                type='button'
                                onClick={props.backToGallery}>
                                Back
                            </Button>
                            <Button
                                height='30px'
                                width='70px'
                                padding='0 10px'
                                margin='110px 20px 0 0'
                                type='button'
                                onClick={() => {
                                    tootglePopWindow();
                                }}>
                                Cancel
                            </Button>
                        </FormButtons>{' '}
                    </Form>
                </DataAcceptWindow>
            )}
        </Module.PaletteAside>
    );
};

export default Palette;
