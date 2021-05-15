import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Layer, Stage, Line } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';

import { DRAG_DATA_KEY, SHAPE_TYPES, DEFAULTS, TOTAL_TYPES } from './constants';
import { Shape } from './shape';

import {
    createShape,
    selectShape,
    clearSelection,
    moveShape,
    removeShape
} from './stateSlice';

const Canvas = (props: any) => {
    const { title, sizeX, sizeY, stageRef, cordinatesXRef, cordinatesYRef } =
        props;

    const GetCords = useRef<any>(null);

    const handleDragOver = (event: any) => event.preventDefault();
    const values = useSelector((state: any) => state.canvas.shape);
    const selector = useSelector((state: any) => state.canvas.selected);
    const dispatch = useDispatch();

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [scroll, setScroll] = useState<{
        stageScale: number;
        stageX: number;
        stageY: number;
    }>({ stageScale: 1, stageX: 0, stageY: 0 });

    let gridOffsetX = -1;
    let extraGridOffset = -5;
    let gridOffsetY = -1;

    const handleDrop = useCallback((event) => {
        const draggedData =
            event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

            console.log(draggedData);

        if (draggedData && stageRef.current) {
            const { offsetX, offsetY, type, clientHeight, clientWidth } =
                JSON.parse(draggedData);

            stageRef.current.setPointersPositions(event);

            const coords = stageRef.current.getPointerPosition();

            switch (type) {
                case SHAPE_TYPES.WALL:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.WALL,
                            format: TOTAL_TYPES.WALL
                        })
                    );
                    break;
                case SHAPE_TYPES.COMPUTER:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.COMPUTER,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.PRINTER:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.PRINTER,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.SWITCH:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.SWITCH,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.ROUTER:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.ROUTER,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.WINDOW:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.WINDOW,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.DOORS:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.DOORS,
                            format: TOTAL_TYPES.SVG
                        })
                    );
                    break;
                case SHAPE_TYPES.TABLE:
                    dispatch(
                        createShape({
                            x: coords.x - offsetX,
                            y: coords.y - offsetY,
                            type: SHAPE_TYPES.TABLE,
                            format: TOTAL_TYPES.TABLE
                        })
                    );
                    break;
                default:
                    break;
            }
        }
    }, []);

    const removeSelection = () => {
        dispatch(clearSelection());
    };

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (
                    (ref.current && event.key === 'Escape') ||
                    event.key === 'Delete'
                ) {
                    dispatch(removeShape());
                }
            }
            document.addEventListener('keydown', handleClickOutside);
            return () => {
                document.removeEventListener('keydown', handleClickOutside);
            };
        }, [ref]);
    }

    const setCordinates = () => {
        cordinatesXRef.current.style.left = stageRef.current.x() + 'px';
        cordinatesYRef.current.style.top = stageRef.current.y() + 'px';
    };

    const handleWheel = (e: any) => {
        e.evt.preventDefault();

        const scaleBy = 1.1;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale =
            e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        setScroll({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
                newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
                newScale
        });

        cordinatesYRef.current.style.height =
            e.evt.deltaY > 0
                ? cordinatesYRef.current.offsetHeight / 1.1 + 'px'
                : cordinatesYRef.current.offsetHeight * 1.1 + 'px';

        cordinatesXRef.current.style.width =
            e.evt.deltaY > 0
                ? cordinatesXRef.current.offsetWidth / 1.1 + 'px'
                : cordinatesXRef.current.offsetWidth * 1.1 + 'px';

        setCordinates();
    };

    return (
        <main
            className='canvas'
            style={{ gridArea: '2 / 3 / 3 / 4' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <Stage
                ref={stageRef}
                height={window.innerHeight - 150}
                width={window.innerWidth - 250}
                draggable={true}
                onDragMove={setCordinates}
                onClick={removeSelection}
                onWheel={handleWheel}
                scaleX={scroll.stageScale}
                scaleY={scroll.stageScale}
                x={scroll.stageX}
                y={scroll.stageY}>
                <Layer ref={GetCords}>
                    {[...Array(sizeX / 20)].map((_, index) => {
                        gridOffsetX += 1;
                        return (
                            <Line
                                key={index}
                                stroke={
                                    gridOffsetX % 5 !== 0 ? '#ddd' : '#858484'
                                }
                                points={[
                                    gridOffsetX * 20,
                                    0,
                                    gridOffsetX * 20,
                                    sizeX
                                ]}
                            />
                        );
                    })}

                    {[...Array(sizeY / 20 + 1)].map((_, index) => {
                        gridOffsetY += 1;
                        return (
                            <Line
                                key={index}
                                stroke={
                                    gridOffsetY % 5 !== 0 ? '#ddd' : '#858484'
                                }
                                points={[
                                    0,
                                    gridOffsetY * 20,
                                    sizeY,
                                    gridOffsetY * 20
                                ]}
                            />
                        );
                    })}
                    {[...Array(sizeX / 20 / 5 + 1)].map((_, index) => {
                        extraGridOffset += 5;
                        return (
                            <Line
                                key={index}
                                stroke={
                                    extraGridOffset % 5 !== 0
                                        ? '#ddd'
                                        : '#858484'
                                }
                                points={[
                                    extraGridOffset * 20,
                                    0,
                                    extraGridOffset * 20,
                                    sizeX
                                ]}
                            />
                        );
                    })}

                    {values.map(
                        (shape: { id: string | number | null | undefined }) => (
                            <Shape
                                key={shape.id}
                                shape={{ ...shape, id: shape.id, selector }}
                            />
                        )
                    )}
                </Layer>
            </Stage>
        </main>
    );
};

export default Canvas;
