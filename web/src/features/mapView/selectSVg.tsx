import { useCallback, useEffect, useRef } from 'react';
import { Transformer, Group } from 'react-konva';
import { transform, selectShape, moveShape } from './stateSlice';
import store from '../../app/store';

import {
    ComputerSVG,
    DoorsKonva,
    PrinterSVG,
    RouterSVG,
    SwitchesSVG,
    WindowKonva
} from './svg/konvaSvgs';

const SelectSVG = ({ type, isSelected, id, svg, ...shapeProps }: any) => {
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
            store.dispatch(transform({node, id, event}))
        },
        [id]
    );

    const svgSelector = () => {
        switch (type) {
            case 'computer':
                return <ComputerSVG />;
            case 'printer':
                return <PrinterSVG />;
            case 'router':
                return <RouterSVG />;
            case 'switch':
                return <SwitchesSVG />;
            case 'doors':
                return <DoorsKonva />;
            case 'window':
                return <WindowKonva />;
            case 'server':
                return null;
            default:
                return null;
        }
    };

    console.log(shapeProps);

    return (
        <>
            <Group
                {...shapeProps}
                draggable
                onClick={handleSelect}
                onTap={handleSelect}
                onDragStart={handleSelect}
                onDragEnd={handleDrag}
                onTransformEnd={handleTransform}
                ref={shapeRef}
                >
                {svgSelector()}
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

export default SelectSVG;
