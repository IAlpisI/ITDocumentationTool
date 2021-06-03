import { useCallback, useEffect, useRef, useState } from 'react';
import { Transformer, Group } from 'react-konva';
import { transform, selectShape, moveShape, clearAxis, createAxis } from './stateSlice';
import store from '../../app/store';

import {
    ComputerSVG,
    DoorsKonva,
    PrinterSVG,
    RouterSVG,
    SwitchesSVG,
    WindowKonva,
    ServerKonva
} from './svg/konvaSvgs';
import { useDispatch } from 'react-redux';

const SelectSVG = ({ type, isSelected, drag, id, stageRef, svg, ...shapeProps }: any) => {
    const transformerRef = useRef<any>();
    const shapeRef = useRef<any>();
    const dispatch = store.dispatch;
    const selectedShape = store.getState().canvas.selectedShape;

    let [x, setX] = useState<boolean>(false);
    let [y, setY] = useState<boolean>(false);

    const handleKeyDown = (event: any) => {
        switch (event.key) {
            case 'y':
                setY((y) => !y);

                break;
            case 'x':
                setX((x) => !x);

                break;
        }
        if (x === false && y === false) dispatch(clearAxis());
    };

    useEffect(() => {
        if (isSelected && drag) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    
        window.addEventListener('keyup', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [isSelected]);

    const handleSelect = useCallback(
        (event) => {
            event.cancelBubble = true;

            store.dispatch(selectShape(id));
            console.log(id);
        },
        [id]
    );

    const handleDrag = useCallback(
        (event) => {
            store.dispatch(moveShape({ id, event }));
        },
        [id]
    );

    const handleTransform = useCallback(
        (event) => {
            // const node = shapeRef.current;
            // store.dispatch(transform({node, id, event}))
        },
        [id]
    );

    const svgSelector = () => {
        switch (type) {
            case 'computer':
                return <ComputerSVG fill={shapeProps.fill}/>;
            case 'printer':
                return <PrinterSVG fill={shapeProps.fill}/>;
            case 'router':
                return <RouterSVG fill={shapeProps.fill}/>;
            case 'switch':
                return <SwitchesSVG fill={shapeProps.fill}/>;
            case 'doors':
                return <DoorsKonva fill={shapeProps.fill}/>;
            case 'window':
                return <WindowKonva fill={shapeProps.fill}/>;
            case 'server':
                return <ServerKonva fill={shapeProps.fill}/>;
            default:
                return null;
        }
    };


    return (
        <>
            <Group
                {...shapeProps}
                draggable={drag}
                onClick={handleSelect}
                onTap={handleSelect}
                onDragStart={handleSelect}
                onDragEnd={handleDrag}
                onTransformEnd={handleTransform}
                ref={shapeRef}
                dragBoundFunc={(pos) => {
                    if (y === true) dispatch(createAxis('y'));
                    if (x === true) dispatch(createAxis('x'));
                    

                    if (y === true) {
                        return {
                            x:
                                selectedShape.x * stageRef.current.scaleX() +
                                stageRef.current.x(),
                            y: pos.y
                        };
                    }
                    if (x === true) {
                        return {
                            y:
                                selectedShape.y * stageRef.current.scaleY() +
                                stageRef.current.y(),
                            x: pos.x
                        };
                    }
                    return {
                        x: pos.x,
                        y: pos.y
                    };
                }}
                >
                {svgSelector()}
            </Group>
            {isSelected && drag && (
                <Transformer
                    ref={transformerRef}
                    anchorSize={5}
                    borderDash={[6, 2]}
                />
            )}
        </>
    );
};

export default SelectSVG;
