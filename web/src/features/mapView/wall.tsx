import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIMITS } from './constants';
import { Rect as KonvaRectangle, Transformer } from 'react-konva';
import {
    transform,
    selectShape,
    moveShape,
    createAxis,
    clearAxis
} from './stateSlice';
import { useAppDispatch } from '../../app/store';
import store from '../../app/store';
import { StorageRounded } from '@material-ui/icons';

export const boundBoxCallbackForRectangle = (oldBox: any, newBox: any) => {
    // limit resize
    if (
        newBox.width < LIMITS.WALL.MIN ||
        newBox.height < LIMITS.WALL.MIN ||
        newBox.width > LIMITS.WALL.MAX ||
        newBox.height > LIMITS.WALL.MAX
    ) {
        return oldBox;
    }
    return newBox;
};

const Wall = ({ type, isSelected, stageRef, drag, id, ...shapeProps }: any) => {
    const shapeRef = useRef<any>();
    const transformerRef = useRef<any>();
    const dispatch = store.dispatch;
    // const userList = useSelector((state: any) => state.dcandidate.userList)
    const values = store.getState().canvas.shape;
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
            // console.log(event);
            const node = shapeRef.current;
            store.dispatch(transform({ node, id, event }));
        },
        [id]
    );

    return (
        <>
            <KonvaRectangle
                onClick={handleSelect}
                onTap={handleSelect}
                onDragStart={handleSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable={drag}
                onDragEnd={handleDrag}
                onTransformEnd={handleTransform}
                strokeWidth={3}
                strokeScaleEnabled={false}
                {...shapeProps}
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
            />
            {isSelected && drag && (
                <Transformer
                    anchorSize={5}
                    // ignoreStroke
                    borderDash={[6, 2]}
                    ref={transformerRef}
                    // boundBoxFunc={boundBoxCallbackForRectangle}
                />
            )}
        </>
    );
};

export default Wall;
