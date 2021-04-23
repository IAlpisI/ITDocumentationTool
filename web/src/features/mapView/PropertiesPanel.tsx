// PropertiesPanel.js
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { updateAttribute } from './stateSlice';

const PropertiesPanel = () => {
    const dispatch = useDispatch();
    const selectedShape = useSelector((state: any) => state.canvas.selected);

    const updateAttr = useCallback((event) => {
        const attr = event.target.name;
        const value = event.target.value;

        dispatch(updateAttribute({ attr, value }));
    }, []);

    const PanelContainer = styled.aside`
        display: flex;
        flex-direction: column;
        padding: 10px;
        z-index: 10;
        grid-area: 1 / 4 / 3 / 5;
        border-left: solid 2px #ddd;
    `;

    const PropertyContainer = styled.div`
        display: grid;
        grid-template-columns: 70px auto;
        grid-template-rows: repeat(3, 35px);
        justify-content: center;
        align-items: center;
         /* border-top: solid 2px black; */
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

    return (
        <PanelContainer>
            <h2>Properties</h2>
            <div className='properties'>
                {selectedShape ? (
                    <>
                        <div className='key'>
                            Type{' '}
                            <span className='value'>{selectedShape.type}</span>
                        </div>

                        <div className='key'>
                            Stroke{' '}
                            <input
                                className='value'
                                name='stroke'
                                type='color'
                                value={selectedShape.stroke}
                                onChange={updateAttr}
                            />
                        </div>

                        <div className='key'>
                            Fill{' '}
                            <input
                                className='value'
                                name='fill'
                                type='color'
                                value={selectedShape.fill}
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
                                Weight
                            </PropertyName>
                            <PropertyInput area={'3 / 2 / 4 / 3'} />
                            <PropertyInput area={'2 / 2 / 3 / 3'} />
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
                            <PropertyInput area={'3 / 2 / 4 / 3'} />
                            <PropertyInput area={'2 / 2 / 3 / 3'} />
                        </PropertyContainer>

                        <PropertyContainer>
                            <PropertyLabel area={'1 / 1 / 2 / 3'}>
                                Rotate
                            </PropertyLabel>
                            <PropertyName area={'2 / 1 / 3 / 2'}>
                                Angel
                            </PropertyName>
                            <PropertyInput area={'2 / 2 / 3 / 3'} />
                        </PropertyContainer>
                    </>
                ) : (
                    <div className='no-data'>Nothing is selected</div>
                )}
            </div>
        </PanelContainer>
    );
};

export default PropertiesPanel;
