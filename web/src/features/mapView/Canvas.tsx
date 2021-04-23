import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Layer, Stage, Line } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';

import { DRAG_DATA_KEY, SHAPE_TYPES } from './constants';
import { Shape } from './Shape';

import Computer from "./Computer"

import {
    createRectangle,
    selectShape,
    clearSelection,
    moveShape,
    removeShape
} from './stateSlice';

const Canvas = () => {
    const handleDragOver = (event: any) => event.preventDefault();
    const values = useSelector((state: any) => state.canvas.shape);
    const selector = useSelector((state: any) => state.canvas.selected);
    const dispatch = useDispatch();
    const stageRef = useRef<any>(null);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const grid = [];
    let gridOffsetX = 0;
    let gridOffsetY = 0;

    const handleDrop = useCallback((event) => {
        const draggedData = event.nativeEvent.dataTransfer.getData(
            DRAG_DATA_KEY
        );

        if (draggedData && stageRef.current) {
            const {
                offsetX,
                offsetY,
                type,
                clientHeight,
                clientWidth
            } = JSON.parse(draggedData);

            stageRef.current.setPointersPositions(event);

            const coords = stageRef.current.getPointerPosition();

            if (type === SHAPE_TYPES.RECT) {
                // rectangle x, y is at the top,left corner
                console.log("test");
                dispatch(
                    createRectangle({
                        x: coords.x - offsetX,
                        y: coords.y - offsetY,
                        type: SHAPE_TYPES.RECT
                    })
                );
            } else if (type === SHAPE_TYPES.COMPUTER){
                dispatch(
                    createRectangle({
                        x: coords.x - offsetX,
                        y: coords.y - offsetY,
                        type: SHAPE_TYPES.COMPUTER
                    })
                );
            }
            // else if (type === SHAPE_TYPES.CIRCLE) {
            //   // circle x, y is at the center of the circle
            //   createCircle({
            //     x: coords.x - (offsetX - clientWidth / 2),
            //     y: coords.y - (offsetY - clientHeight / 2),
            //   });
            // }
        }
    }, []);

    const removeSelection = () => {
        dispatch(clearSelection());
    };

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                // if (ref.current && !ref.current.contains(event.target)) {
                //     alert("You clicked outside of me!");
                // }
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

    return (
        <main
            className='canvas'
            style={{gridArea: "2 / 3 / 3 / 4"}}
            onDrop={handleDrop}
            onDragOver={handleDragOver}>
            {/* <div ref={wrapperRef} className='buttons'>
                 <button onClick={saveDiagram}>Save</button>
        <button onClick={reset}>Reset</button> 
            </div> */}
            <Stage
                ref={stageRef}
                // width={window.innerWidth - 750}
                // height={window.innerHeight}
                height={800}
                width={800}
                draggable={true}
                onClick={removeSelection}>
                <Layer>
                    {[...Array(100)].map((value, index) => {
                        gridOffsetX += 1;
                        return (
                            <Line
                                key={index}
                                stroke='#ddd'
                                points={[
                                    gridOffsetX * 20,
                                    0,
                                    gridOffsetX * 20,
                                    3000
                                ]}
                            />
                        );
                    })}

                    {[...Array(100)].map((value, index) => {
                        gridOffsetY += 1;
                        return (
                            <Line
                                key={index}
                                stroke='#ddd'
                                points={[
                                    0,
                                    gridOffsetY * 20,
                                    3000,
                                    gridOffsetY * 20
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
// import { useEffect, useRef } from "react"

// const SimpleCanvas = () => {
//     const canvasRef = useRef<HTMLCanvasElement>(null)
//     const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

//     useEffect(() => {
//         // Initialize
//         if (canvasRef.current) {
//           canvasCtxRef.current = canvasRef.current.getContext('2d');
//           let ctx = canvasCtxRef.current; // Assigning to a temp variable
//           ctx!.beginPath(); // Note the Non Null Assertion
//           ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
//           ctx!.stroke();
//         }
//       }, []);

//     return <canvas ref={canvasRef}></canvas>
// }
