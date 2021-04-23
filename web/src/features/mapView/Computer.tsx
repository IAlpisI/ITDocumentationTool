import React, { useCallback, useEffect, useRef } from 'react';
import { Path, Transformer, Ellipse, Rect, Line, Group } from 'react-konva';
import { transformRectangle, selectShape, moveShape } from './stateSlice';
import store from '../../app/store';

const Computer = ({ type, isSelected, id, ...shapeProps }: any) => {
    const transformerRef = useRef<any>();
    const shapeRef = useRef<any>();

    useEffect(() => {
        if (isSelected) {
            transformerRef.current.nodes([shapeRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
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
            const node = shapeRef.current;
            // store.dispatch(transformRectangle({node, id, event}))
        },
        [id]
    );

    return (
        <>
            <Group
                {...shapeProps}
                draggable
                onClick={handleSelect}
                onTap={handleSelect}
                onDragStart={handleSelect}
                ref={shapeRef}>
                {/* <Ellipse
                fill={'black'}
                x={99}
                y={28}
                radiusX={1.5}
                radiusY={0.75}
            /> */}
                <Path
                    x={50}
                    y={50}
                    scaleX={1}
                    scaleY={1}
                    fill={'black'}
                    data={
                        'M106.585,17.166H67.443c-1.657,0-3.013,1.356-3.013,3.01V31.07h6.027v-8.353h33.119v9.029H75.163v8.278h28.412v1.507H75.163v7.526h28.412v1.503H75.163v34.189H64.437v4.67c0,1.653,1.356,3.01,3.01,3.01h39.145c1.653,0,3.01-1.356,3.01-3.01V20.172C109.595,18.522,108.239,17.166,106.585,17.166z M87.009,72.527 c-2.491,0-4.517-2.018-4.517-4.517c0-2.491,2.022-4.517,4.517-4.517c2.494,0,4.52,2.018,4.52,4.517 C91.529,70.509,89.503,72.527,87.009,72.527z'
                    }
                />
                <Rect x={50} y={85} fill={'black'} width={71} height={46} />
                <Line points={[80, 140, 85, 135, 95, 135, 100, 140]} fill={'black'} closed />
            </Group>
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    anchorSize={5}
                    borderDash={[6, 2]}
                />
            )}
        </>
    );
};

export default Computer;
