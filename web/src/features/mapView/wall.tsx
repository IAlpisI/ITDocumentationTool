import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LIMITS } from "./constants";
import { Rect as KonvaRectangle, Transformer } from 'react-konva'
import {transform, selectShape, moveShape} from "./stateSlice"
import { useAppDispatch } from "../../app/store";
import store from "../../app/store"

export const boundBoxCallbackForRectangle = (oldBox:any, newBox:any) => {
  // limit resize
  if (
    newBox.width < LIMITS.WALL.MIN ||
    newBox.height < LIMITS.WALL.MIN ||
    newBox.width > LIMITS.WALL.MAX ||
    newBox.height > LIMITS.WALL.MAX
  ) {
    return oldBox
  }
  return newBox
}

const Wall = ({ type, isSelected, id, ...shapeProps }:any) => {

  const shapeRef = useRef<any>();
  const transformerRef = useRef<any>();
  // const dispatch = store.dispatch
  // const userList = useSelector((state: any) => state.dcandidate.userList)
  const values = store.getState().canvas.shape;


  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current])
      transformerRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  const handleSelect = useCallback(
    (event) => {
      event.cancelBubble = true

      store.dispatch(selectShape(id))
    },
    [id]
  )

  const handleDrag = useCallback(
    (event) => {
      store.dispatch(moveShape({id, event}))
    },
    [id]
  )

  const handleTransform = useCallback(
    (event) => {
      const node = shapeRef.current
      store.dispatch(transform({node, id, event}))
    },
    [id]
  )

  return (
    <>
      <KonvaRectangle
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
        strokeWidth={3}
        strokeScaleEnabled={false}
        {...shapeProps}
      />
      {isSelected && (
        <Transformer
          anchorSize={5}
          // ignoreStroke
          borderDash={[6, 2]}
          ref={transformerRef}
          // boundBoxFunc={boundBoxCallbackForRectangle}
        />
      )}
    </>
  )
}

export default Wall
