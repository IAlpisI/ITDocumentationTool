import { useCallback } from 'react';
import store from '../../app/store';
import SelectSVG from './selectSVg';

import { SHAPE_TYPES } from './constants';
import Wall from './wall';

export function Shape({ shape }: any, selector: any) {
    let isSelected = false;

    const getSelector = useCallback(
        () => store.getState().canvas.selected === shape.id,
        []
    );

    isSelected = getSelector();

    switch (shape.type) {
        case SHAPE_TYPES.COMPUTER:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.COMPUTER}
                />
            );
        case SHAPE_TYPES.PRINTER:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.PRINTER}
                />
            );
        case SHAPE_TYPES.SWITCH:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.SWITCH}
                />
            );
        case SHAPE_TYPES.ROUTER:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.ROUTER}
                />
            );
        case SHAPE_TYPES.DOORS:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.DOORS}
                />
            );
        case SHAPE_TYPES.WINDOW:
            return (
                <SelectSVG
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.WINDOW}
                />
            );
        case SHAPE_TYPES.WALL:
            return <Wall {...shape} isSelected={isSelected} />;
        case SHAPE_TYPES.TABLE:
            return <Wall {...shape} isSelected={isSelected} />;
    }

    return null;
}
