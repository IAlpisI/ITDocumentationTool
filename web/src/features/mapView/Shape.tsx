// Shape.js
import { SortTwoTone } from '@material-ui/icons'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import store, { useAppDispatch } from '../../app/store'
import Computer from './Computer'

import { SHAPE_TYPES } from './constants'
import Rectangle from './Rectangle'

export function Shape({ shape }: any, selector: any) {
  // const isSelectedSelector = useCallback(() => {
  //   const values = store.getState().canvas
  //   values.selected === shape.id
  // }, [shape])

  let isSelected = false //isSelectedSelector

  // const testing = store.subscribe(isSelectedSelector)

  // console.log(testing)

  const getSelector = useCallback(() => 
    store.getState().canvas.selected === shape.id
  ,[])

  isSelected = getSelector()

  // useEffect(() => {
  //   console.log("testing state change "+selector)
  //   console.log(getSelector())
  // }, [])

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={isSelected} />
  } 
  else if(shape.type === SHAPE_TYPES.COMPUTER) {
    console.log("test computer");
    return <Computer {...shape} isSelected={isSelected} />
  }

  return null
}
