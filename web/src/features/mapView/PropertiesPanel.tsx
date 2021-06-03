// PropertiesPanel.js
import { useCallback } from 'react';
import styled from 'styled-components';
import store from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttribute } from './stateSlice';

const PanelContainer = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 10px;
    z-index: 10;
    grid-area: 1 / 4 / 4 / 5;
    border-left: solid 2px #ddd;
`;

const PropertyContainer = styled.div`
    display: grid;
    grid-template-columns: 70px auto;
    grid-template-rows: repeat(3, 35px);
    justify-content: center;
    align-items: center;
`;

const PropertyName = styled.div<{ area: string }>`
    grid-area: ${(props) => props.area};
    font-size: 12px;
`;

const PropertyLabel = styled.div<{ area: string }>`
    grid-area: ${(props) => props.area};
    border-bottom: solid 2px black;
`;

const PropertyInput = styled.input<{ area: string }>`
    grid-area: ${(props) => props.area};
    border: solid 1px #ddd;
`;

const PropertiesTitle = styled.div`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: 800;
    color: ${(props) => props.theme.colors.grey3};
`;

const PropertiesPanel = () => {
    const dispatch = useDispatch();
    const selectedShape = useSelector((state: any) => state.canvas.selected);
    let selectedShapeData = useSelector(
        (state: any) => state.canvas.selectedShape
    );

    const updateAttr = useCallback((event) => {
        const attr = event.target.name;
        let value = event.target.value;
        console.log(value);
        console.log(attr);
        // if(isNaN(value) || value === undefined) return
        if (attr !== 'stroke' && attr !== 'fill') value = parseInt(value);

        dispatch(updateAttribute({ attr, value }));
    }, []);

    const getSelector = useCallback(
        () => store.getState().canvas.selectedShape,
        []
    );

    getSelector();

    console.log(selectedShape);

    return (
        <>
            <PanelContainer>
                {selectedShape !== '' && (
                    <>
                        <PropertiesTitle>Properties</PropertiesTitle>
                        <div className='properties'>
                            <>
                                <div className='key'>
                                    Type{' '}
                                    <span className='value'>
                                        {selectedShapeData?.type}
                                    </span>
                                </div>

                                {(selectedShapeData?.type === 'wall' ||
                                    selectedShapeData?.type === 'table') && (
                                    <>
                                        <div className='key'>
                                            Stroke{' '}
                                            <input
                                                className='value'
                                                name='stroke'
                                                type='color'
                                                value={
                                                    selectedShapeData?.stroke
                                                }
                                                onChange={updateAttr}
                                            />
                                        </div>{' '}
                                    </>
                                )}

                                <div className='key'>
                                    Fill{' '}
                                    <input
                                        className='value'
                                        name='fill'
                                        type='color'
                                        value={selectedShapeData?.fill}
                                        onChange={updateAttr}
                                    />
                                </div>

                                <PropertyContainer>
                                    <PropertyLabel area={'1 / 1 / 2 / 3'}>
                                        Size
                                    </PropertyLabel>
                                    <PropertyName area={'2 / 1 / 3 / 2'}>
                                        Height
                                    </PropertyName>
                                    <PropertyName area={'3 / 1 / 4 / 2'}>
                                        Width
                                    </PropertyName>
                                    <PropertyInput
                                        name='width'
                                        onChange={updateAttr}
                                        value={Math.round(
                                            selectedShapeData?.width
                                        )}
                                        area={'3 / 2 / 4 / 3'}
                                    />
                                    <PropertyInput
                                        name='height'
                                        onChange={updateAttr}
                                        value={Math.round(
                                            selectedShapeData?.height
                                        )}
                                        area={'2 / 2 / 3 / 3'}
                                    />
                                </PropertyContainer>

                                <PropertyContainer>
                                    <PropertyLabel area={'1 / 1 / 2 / 3'}>
                                        Position
                                    </PropertyLabel>
                                    <PropertyName area={'2 / 1 / 3 / 2'}>
                                        X
                                    </PropertyName>
                                    <PropertyName area={'3 / 1 / 4 / 2'}>
                                        Y
                                    </PropertyName>
                                    <PropertyInput
                                        name='y'
                                        onChange={updateAttr}
                                        value={Math.round(selectedShapeData?.y)}
                                        area={'3 / 2 / 4 / 3'}
                                    />
                                    <PropertyInput
                                        name='x'
                                        onChange={updateAttr}
                                        value={Math.round(selectedShapeData?.x)}
                                        area={'2 / 2 / 3 / 3'}
                                    />
                                </PropertyContainer>

                                <PropertyContainer>
                                    <PropertyLabel area={'1 / 1 / 2 / 3'}>
                                        Rotate
                                    </PropertyLabel>
                                    <PropertyName area={'2 / 1 / 3 / 2'}>
                                        Angel
                                    </PropertyName>
                                    <PropertyInput
                                        name='rotation'
                                        onChange={updateAttr}
                                        value={Math.round(
                                            selectedShapeData?.rotation
                                        )}
                                        area={'2 / 2 / 3 / 3'}
                                    />
                                </PropertyContainer>
                            </>
                        </div>
                    </>
                )}
            </PanelContainer>
        </>
    );
};

export default PropertiesPanel;
