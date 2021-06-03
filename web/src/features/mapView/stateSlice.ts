import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from "nanoid"
import clamp from "clamp";
import { SHAPE_TYPES, DEFAULTS, LIMITS, TOTAL_TYPES, FLOORPLANS } from "./constants";



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

const defaultWidth = (format: string) => {
    switch (format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG.WIDTH;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.WIDTH;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.WIDTH
    }
}

const defaultHeight = (format: string) => {
    switch (format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG.HEIGHT;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.HEIGHT;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.HEIGHT
    }
}

const defaultFill = (format: string) => {
    switch (format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG.FILL;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.FILL;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.FILL
    }
}

const defaultStroke = (format: string) => {
    switch (format) {
        case TOTAL_TYPES.SVG:
            return DEFAULTS.SVG;
        case TOTAL_TYPES.TABLE:
            return DEFAULTS.TABLE.STROKE;
        case TOTAL_TYPES.WALL:
            return DEFAULTS.WALL.STROKE
    }
}

export const values = (x: number, y: number, type: string, format: string, deviceId?: any) => ({
    id: nanoid(),
    deviceId,
    type: type,
    width: defaultWidth(format),
    height: defaultHeight(format),
    fill: defaultFill(format),
    stroke: defaultStroke(format),
    rotation: DEFAULTS.WALL.ROTATION,
    format,
    x,
    y,
})

const initAxis = { x: 0, y: 0, axis: '' }

const usersInitialState = {
    shape: [] as Array<any>,
    svgs: [],
    selected: '',
    selectedShape: {} as any,
    axis: {} as any
};

const stateSlice = createSlice({
    name: 'State',
    initialState: usersInitialState,
    reducers: {
        setValue(state, action: any) {
            state.shape = action.payload;
        },
        clearAxis(state) {
            state.axis = initAxis;
        },
        createAxis(state, action: any) {
            const x = state.selectedShape.x 
            const y = state.selectedShape.y 

            let ofsetY = state.selectedShape.height;
            let tempY = y+ofsetY/2

            let ofsetX = state.selectedShape.width;
            let tempX = x+ofsetX/2

            switch (action.payload) {
                case 'x':
                    state.axis = {x, y: tempY, axis:'x'}
                    break;
                case 'y':
                    state.axis = {x: tempX, y, axis:'y'}
                    break;
            }

        },
        createShape(state, action: any) {
            const { x, y, type, format, deviceId } = action.payload
            state.shape.push(values(x, y, type, format, deviceId))
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

                if (shape.x < 0) shape.x = 0
                if (shape.y < 0) shape.y = 0



                state.selectedShape = shape

                const item = state.shape.find((x: any) => x.id === shape.id);
                const index = state.shape.indexOf(item)
                state.shape.splice(index, 1);
                state.shape.push(item);
                state.selectedShape = item;


            }
        },
        updateAttribute(state, action: any) {
            const { attr, value }: { attr: string, value: string } = action.payload
            const shape = state.shape.find(x => x.id === state.selected)

            if (isNaN(parseInt(value)) && attr !== 'stroke' && attr !== 'fill') return

            if (shape) {
                const test = attr as keyof cords;
                (shape[test] as string) = value;
                state.selectedShape = shape
            }

        },
        transform(state, actions: any) {
            const { node, id, event } = actions.payload

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
        saveDiagram(state, action: any) {
            const { title, sizeX, sizeY, stageRef } = action.payload.props
            const uri = stageRef.current.toDataURL();
            const map = localStorage.getItem(FLOORPLANS);
            if (map === null) {
                localStorage.setItem(FLOORPLANS, JSON.stringify([{ title, shape: state.shape, img: uri, sizeX, sizeY }]))
            } else {
                const maps = JSON.parse(map);
                console.log(maps)
                const filtered = maps.filter((x: any) => x.title !== title);
                filtered.push({ title, shape: state.shape, img: uri, sizeX, sizeY })
                localStorage.setItem(FLOORPLANS, JSON.stringify(filtered))
            }
        }
    },
})


export const { createShape, saveDiagram, removeShape, selectShape, clearSelection, moveShape, transform, updateAttribute, setValue, clearAxis, createAxis } = stateSlice.actions
export default stateSlice.reducer

