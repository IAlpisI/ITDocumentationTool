import styled from 'styled-components';
import { IMap } from './mapIndex';
import { useForm } from 'react-hook-form';
import { DataAcceptWindow } from '../../common/popWindows';
import { useState } from 'react';
import { Button } from '../../common/Styles/common.style';
import { FLOORPLANS } from './constants';
import { setValue } from './stateSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router'

const Container = styled.div`
    background: ${(props) => props.theme.colors.white};
    margin: 50px;
    padding: 30px;
    width: calc(100%-250px);
    height: 100%;
`;

const GalleryLabel = styled.div`
    font-size: 25px;
    margin: 20px 0 -30px 50px;
`;

const MapAddButton = styled.button`
    height: 30px;
    width: 150px;
    margin: 30px 30px 30px 0;
    background: ${(props) => props.theme.colors.violet2};
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
`;

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 280px);
    justify-items: center;
    gap: 10px;
`;

export const Form = styled.div`
    width: 300px;
    height: 350px;
    padding: 10px 10px 10px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${(props) => props.theme.colors.white};
`;

export const FormName = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const FormInput = styled.input`
    height: 30px;
    width: 80%;
    background: ${(props) => props.theme.colors.grey1};
`;

const FormLabel = styled.div`
    font-size: 17px;
    margin: 5px 0;
`;

export const FormButtons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
`;

const Element = styled.div`
    position: relative;
    height: 220px;
    width: 200px;

    overflow: hidden;

    &:hover > button {
        transition: 1s ease;
        display: inline-block;
    }
`;

const ElementImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    background-repeat: no-repeat;
    transition: 0.2s ease;
    border: solid 3px ${(props) => props.theme.colors.grey2};

    &:hover {
        filter: blur(8px);
    }
`;

const ElementTitle = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 650;
    color: ${(props) => props.theme.colors.grey3};
`;

const ElementButton = styled.button<{ top?: string; right?: string }>`
    width: 50px;
    height: 30px;
    background: ${(props) => props.theme.colors.white};
    position: absolute;
    top: ${(props) => props.top};
    right: ${(props) => props.right};
    cursor: pointer;
    z-index: 10;
    display: none;

    &:hover ~ img {
        filter: blur(8px);
    }
`;

type MapProps = {
    Map: IMap;
    mapSwap: (title: string, x: string, y: string) => void;
};

const MapGallery = (props: MapProps) => {
    const methods = useForm();
    const history = useHistory()
    const dispatch = useDispatch();
    const [popup, setPopup] = useState<boolean>(false);

    const createMap = (data: any) => {
        // const maps = getMaps()
        // console.log(maps)
        // const isPresent = maps.find((x:any) => 
        //  (x.title === data.tile))
        // // console.log()
        // console.log(isPresent);
        // if(isPresent){
        //     return
        // }

        props.mapSwap(data.title, data.sizeX, data.sizeY);
    };

    const togglePopup = () => {
        setPopup((popup) => !popup);
    };

    const getMaps = () => {
        const maps: any = localStorage.getItem(FLOORPLANS);
        return JSON.parse(maps);
    };

    const removeMap = (title: string) => {
        const maps = getMaps()
        const filtered = maps.filter((x:any) => x.title !== title);
        localStorage.setItem(FLOORPLANS, JSON.stringify(filtered))
        history.go(0)
    };

    return (
        <>
            <GalleryLabel>Floor plans</GalleryLabel>
            <Container>
                <ContainerContent>
                    <MapAddButton onClick={togglePopup}>
                        Create a new floor plan
                    </MapAddButton>
                    {popup && (
                        <DataAcceptWindow>
                            <form
                                autoComplete='off'
                                onSubmit={methods.handleSubmit(createMap)}>
                                <Form>
                                    <FormName>Create a new floor plan</FormName>
                                    <FormLabel>Title</FormLabel>
                                    <FormInput {...methods.register('title')} />
                                    <FormLabel>Lenght</FormLabel>
                                    <FormInput {...methods.register('sizeX')} />
                                    <FormLabel>Width</FormLabel>
                                    <FormInput {...methods.register('sizeY')} />
                                    <FormButtons>
                                        <Button
                                            height='30px'
                                            width='70px'
                                            padding='0 10px'
                                            background
                                            type='submit'>
                                            Create
                                        </Button>
                                        <Button
                                            height='30px'
                                            width='70px'
                                            padding='0 10px'
                                            type='button'
                                            onClick={togglePopup}>
                                            Cancel
                                        </Button>
                                    </FormButtons>
                                </Form>
                            </form>
                        </DataAcceptWindow>
                    )}

                    <Gallery>
                        {getMaps().map((x: any, index: number) => (
                            <Element key={index}>
                                <ElementTitle>{x.title}</ElementTitle>
                                <ElementButton
                                    onClick={() => {
                                        dispatch(setValue(x.shape));
                                        createMap({
                                            title: x.title,
                                            sizeX: x.sizeX,
                                            sizeY: x.sizeY
                                        });
                                    }}
                                    top='70px'
                                    right='140px'>
                                    View
                                </ElementButton>
                                <ElementButton top='70px' right='80px'>
                                    Edit
                                </ElementButton>
                                <ElementButton
                                    onClick={() => {
                                        removeMap(x.title);
                                    }}
                                    top='70px'
                                    right='20px'>
                                    Delete
                                </ElementButton>
                                <ElementImage src={x.img} />
                            </Element>
                        ))}
                    </Gallery>
                </ContainerContent>
            </Container>
        </>
    );
};

export default MapGallery;
