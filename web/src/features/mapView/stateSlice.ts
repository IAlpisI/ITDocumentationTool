import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { nanoid } from "nanoid"
import clamp from "clamp";
import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";
import { keys } from '@material-ui/core/styles/createBreakpoints';


type cords = {
    id: string
    type: string
    width: number
    height: number
    fill: string
    stroke: string
    rotation: number
    x: number
    y: number
}

export const values = ( x:number, y:number, type:string ) => ({
    id: nanoid(),
    type: type, // rect
    width: DEFAULTS.RECT.WIDTH, // 150
    height: DEFAULTS.RECT.HEIGHT, // 100
    fill: DEFAULTS.RECT.FILL, // #ffffff
    stroke: DEFAULTS.RECT.STROKE, // #000000,
    rotation: DEFAULTS.RECT.ROTATION, // 0
    x,
    y,
})

const svgValues = () => {
    
}

const usersInitialState = {
    shape: [values(0, 0, SHAPE_TYPES.RECT)],
    svgs: [],
    selected: {}
};

interface updateAttributes {
    attr: String, 
    value: any
}

const stateSlice = createSlice({
    name: 'State',
    initialState: usersInitialState,
    reducers: {
        createRectangle(state, action: any) {
            const {x, y, type} = action.payload
            console.log(x);
            state.shape.push(values(x, y, type))
        },
        selectShape(state, action: any) {
            state.selected = action.payload
        },
        removeShape(state){
            const reducedList = state.shape.filter(x => x.id !== state.selected)
            state.shape = reducedList;
        },
        clearSelection(state) {
            state.selected = {}
        },
        moveShape(state, actions: any) {
            console.log(actions.payload)
            const {id, event} = actions.payload
            const shape = state.shape.find(x => x.id === id)
            
            if (shape) {
                shape.x = event.target.attrs.x;
                shape.y = event.target.attrs.y;
            }
        },
        updateAttribute(state, action: any){
            const {attr, value} :{attr: string, value: string}  = action.payload
            const shape = state.shape.find(x => x.id ===  state.selected)
            
            if(shape){
                const test = attr as keyof cords;
                (shape[test] as string) = value;
            }

        },
        transformRectangle(state, actions: any) {
            const [node, id, event] = actions

            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset the scale back
            node.scaleX(1);
            node.scaleY(1);

            const shape = state.shape[id];

            if (shape) {
                shape.x = node.x();
                shape.y = node.y();

                shape.rotation = node.rotation();

                shape.width = clamp(
                    // increase the width in order of the scale
                    node.width() * scaleX,
                    // should not be less than the minimum width
                    LIMITS.RECT.MIN,
                    // should not be more than the maximum width
                    LIMITS.RECT.MAX
                );
                shape.height = clamp(
                    node.height() * scaleY,
                    LIMITS.RECT.MIN,
                    LIMITS.RECT.MAX
                );

                state.shape[id] = shape
            }
        }
    },
})

function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

export const { createRectangle, removeShape, selectShape, clearSelection, moveShape, transformRectangle, updateAttribute } = stateSlice.actions
export default stateSlice.reducer

