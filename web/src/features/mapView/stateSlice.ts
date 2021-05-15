import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from "nanoid"
import clamp from "clamp";
import { SHAPE_TYPES, DEFAULTS, LIMITS, TOTAL_TYPES,  FLOORPLANS } from "./constants";



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

const defaultWidth = (format:string) => {
    switch(format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG.WIDTH;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.WIDTH;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.WIDTH
    }
}

const defaultHeight = (format:string) => {
    switch(format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG.HEIGHT;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.HEIGHT;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.HEIGHT
    }
}

export const values = (x: number, y: number, type: string, format: string) => ({
    id: nanoid(),
    type: type,
    width: defaultWidth(format), 
    height: defaultHeight(format), 
    fill: DEFAULTS.WALL.FILL, 
    stroke: DEFAULTS.WALL.STROKE, 
    rotation: DEFAULTS.WALL.ROTATION, 
    format,
    x,
    y,
})

const usersInitialState = {
    shape: [values(0, 0, SHAPE_TYPES.WALL, TOTAL_TYPES.WALL)],
    svgs: [],
    selected: '',
    selectedShape: {}
};

const stateSlice = createSlice({
    name: 'State',
    initialState: usersInitialState,
    reducers: {
        setValue(state, action:any) {
            state.shape = action.payload;
        },
        createShape(state, action: any) {
            const { x, y, type, format } = action.payload
            state.shape.push(values(x, y, type, format))
        },
        selectShape(state, action: any) {
            state.selected = action.payload
            const shape = state.shape.find(x => x.id === action.payload)
            state.selectedShape = shape as any;
        },
        removeShape(state) {
            const reducedList = state.shape.filter(x => x.id !== state.selected)
            state.shape = reducedList;
        },
        clearSelection(state) {
            state.selected = ''
            state.selectedShape = {}
        },
        moveShape(state, actions: any) {
            const { id, event } = actions.payload
            const shape = state.shape.find(x => x.id === id)

            if (shape) {
                shape.x = event.target.attrs.x;
                shape.y = event.target.attrs.y;

                if(shape.x < 0) shape.x = 0
                if(shape.y < 0) shape.y =0

                console.log(shape)

                state.selectedShape = shape
            }
        },
        updateAttribute(state, action: any) {
            const { attr, value }: { attr: string, value: string } = action.payload
            const shape = state.shape.find(x => x.id === state.selected)

            if(isNaN(parseInt(value))) return

            if (shape) {
                const test = attr as keyof cords;
                (shape[test] as string) = value;
                state.selectedShape = shape
            }

        },
        transform(state, actions: any) {
            const {node, id, event} = actions.payload

            const scaleX = node.attrs.scaleX;
            const scaleY = node.attrs.scaleY;

            node.scaleX(1);
            node.scaleY(1);

            const shape = state.shape.find(x => x.id === id);

            if (shape) {
                shape.x = node.attrs.x;
                shape.y = node.attrs.y;

                shape.rotation = node.rotation();

                // shape.width = clamp(
                //     node.width() * scaleX,
                //     LIMITS.WALL.MIN,
                //     LIMITS.WALL.MAX
                // );
                // shape.height = clamp(
                //     node.height() * scaleY,
                //     LIMITS.WALL.MIN,
                //     LIMITS.WALL.MAX
                // );

                shape.width = node.attrs.width * scaleX;
                shape.height = node.attrs.height * scaleY;
                state.selectedShape = shape;
            }
        },
        saveDiagram(state, action:any) {
            const {title, sizeX, sizeY, stageRef} = action.payload.props
            const uri = stageRef.current.toDataURL();
            const map = localStorage.getItem(FLOORPLANS);
            if(map === null) {
                localStorage.setItem(FLOORPLANS, JSON.stringify([{title, shape:state.shape, img:uri, sizeX, sizeY}]))
            }else {
                const maps = JSON.parse(map);
                console.log(maps)
                const filtered = maps.filter((x:any) => x.title !== title);
                filtered.push({title, shape:state.shape, img:uri, sizeX, sizeY})
                localStorage.setItem(FLOORPLANS, JSON.stringify(filtered))
            }
        }
    },
})


export const { createShape, saveDiagram, removeShape, selectShape, clearSelection, moveShape, transform, updateAttribute, setValue } = stateSlice.actions
export default stateSlice.reducer

