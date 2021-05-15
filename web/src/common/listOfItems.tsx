import styled from 'styled-components';

const Container = styled.div`
    height: 500px;
    width: 400px;
    overflow-y: scroll;
    background: ${(props) => props.theme.colors.white};
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: repeat(10, 40px);
    padding: 10px;
    gap: 5px;
`;

const ItemHeader = styled.div`
    font-weight: 800;
    /* border: 1px solid ${props => props.theme.colors.grey1}; */
`;

const Item = styled.div`
    max-height: 40px;
    padding: 3px;
    cursor: pointer;
    /* border: 1px solid ${props => props.theme.colors.grey1}; */
`;

const notEmpty = (object: any) => {
    for (let i in object) return true;
    return false;
};

type Props<DataItem> = {
    items: DataItem[];
    activasionFunction?: any;
    headers?: any;
    filterFunction?: any;
};

export default function ListOfItems<DataItem extends object | string>({
    items,
    activasionFunction,
    headers,
    filterFunction
}: Props<DataItem>) {
    console.log('headers');
    console.log(headers);

    return (
        <>
            {items !== null && notEmpty(items) && (
                <Container>
                    {headers.map((item: any, index: any) => {
                        return <ItemHeader key={index}>{item}</ItemHeader>;
                    })}
                    {items
                        .filter(filterFunction)
                        .map((item: any, index: number) => {
                            return (
                                // <ItemWrap
                                //     key={index}
                                //     onClick={() => {
                                //         if (activasionFunction !== undefined)
                                //             activasionFunction(item.id);
                                //     }}>
                                Object.keys(item).map((itemKey, index) => {
                                    if (itemKey !== 'id')
                                        return (
                                            item[itemKey]!==null && <Item
                                                onClick={() => {
                                                    if (
                                                        activasionFunction !==
                                                        undefined
                                                    )
                                                        activasionFunction(
                                                            item.id
                                                        );
                                                }}
                                                key={index}>
                                                {item[itemKey]}
                                            </Item> 
                                        )
                                })

                                // </ItemWrap>
                            );
                        })}
                </Container>
            )}
        </>
    );
}
