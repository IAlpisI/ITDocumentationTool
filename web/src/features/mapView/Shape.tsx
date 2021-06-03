import { useCallback } from 'react';
import store from '../../app/store';
import SelectSVG from './selectSVg';

import { SHAPE_TYPES } from './constants';
import Wall from './wall';
import Table from './table';

export function Shape({ shape, stageRef, drag }: any) {
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
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.COMPUTER}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.PRINTER:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.PRINTER}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.SWITCH:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.SWITCH}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.ROUTER:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.ROUTER}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.DOORS:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.DOORS}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.WINDOW:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.WINDOW}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.SERVER:
            return (
                <SelectSVG
                    stageRef={stageRef}
                    {...shape}
                    isSelected={isSelected}
                    type={SHAPE_TYPES.SERVER}
                    drag={drag}
                />
            );
        case SHAPE_TYPES.WALL:
            return (
                <Wall
                    {...shape}
                    isSelected={isSelected}
                    drag={drag}
                    stageRef={stageRef}
                />
            );
        case SHAPE_TYPES.TABLE:
            return (
                <Table
                    {...shape}
                    isSelected={isSelected}
                    drag={drag}
                    stageRef={stageRef}
                />
            );
    }

    return null;
}
