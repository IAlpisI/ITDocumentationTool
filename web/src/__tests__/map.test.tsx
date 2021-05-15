import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '../app/store';
import {createShape, selectShape, removeShape, clearSelection, moveShape, updateAttribute, saveDiagram} from '../features/mapView/stateSlice'
import {SHAPE_TYPES} from '../features/mapView/constants'

describe('MapSlice', () => {
    test('Save state in local storage', () => {
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }
        store.dispatch(createShape(shape)) 
        store.dispatch(saveDiagram({title:'test'})) 
        const diagram = localStorage.getItem('test')
        expect(diagram).toBeDefined();
    })

    test('Move shape around the map', () => {
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }

        store.dispatch(createShape(shape))    
        store.dispatch(moveShape({x:10, y:10})) 
        const selected = store.getState().canvas.selected;
        expect(shape).toBe(selected)   
    })

    test('Clear selection from state', () => {
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }
        store.dispatch(createShape(shape))    
        store.dispatch(selectShape(shape)) 
        const selected = store.getState().canvas.selected;
        expect(shape).toBe(selected)   
    })

    test('Remove object from state', () => {
        let state = store.getState().canvas;
        const initialShapeCount = state.shape.length;
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }
        store.dispatch(createShape(shape))    
        state = store.getState().canvas;
        store.dispatch(removeShape()) 
        expect(state.shape.length).toBe(initialShapeCount); 
    })

    test('New object is added to state', () => {
        let state = store.getState().canvas;
        const initialShapeCount = state.shape.length;
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }
        store.dispatch(createShape(shape))    
        state = store.getState().canvas;
        const newObject = state.shape.find((x) => x.type === SHAPE_TYPES.WALL)
        expect(newObject?.x).toBe(shape.x)    
        expect(newObject?.y).toBe(shape.y)    
        expect(newObject?.type).toBe(shape.type)   
        expect(state.shape.length).toBeGreaterThan(initialShapeCount); 
    })

    test('Select field changes after new object is selected', () => {
        let state = store.getState().canvas;
        const shape = {
            x:0,
            y:0,
            type:SHAPE_TYPES.WALL
        }
        store.dispatch(createShape(shape)) 
        const newObject = state.shape.find((x) => x.type === SHAPE_TYPES.WALL)
        store.dispatch(selectShape(newObject))
        expect(newObject).toBe(store.getState().canvas.selected) 
    })
})
