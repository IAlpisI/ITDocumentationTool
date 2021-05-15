import Tree from 'react-d3-tree';
import 'react-tree-graph/dist/style.css';
import styled from 'styled-components';
import {
    SvgComputer,
    SvgRouter,
    SvgInternet,
    SvgPrinter,
    SvgServer,
    SvgSwitch
} from './svgs';
import { useState } from 'react';
import { useCenteredContainer } from '../../common/helpers/centerContainer';

const orgChart = {
    name: 'Internet',
    id: 'test55',
    children: [
        {
            name: 'Router',
            // ipaddress: '10.0.0.1',
            children: [
                {
                    name: 'Switch',
                    ipaddress: '10.0.1.3',
                    children: [
                        {
                            name: 'Pc',
                            ipaddress: '10.0.1.10'
                        }
                    ]
                },
                {
                    name: 'Switch',
                    ipaddress: '10.0.1.4',
                    children: [
                        {
                            name: 'Pc',
                            ipaddress: '10.0.1.50'
                        },
                        {
                            name: 'Printer',
                            ipaddress: '10.0.1.51'
                        },
                        {
                            name: 'Server',
                            ipaddress: '10.0.1.52'
                        }
                    ]
                }
            ]
        }
    ]
};

const Container = styled.div`
    height: 88vh;
`;

const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 0 0 5px;
`;

const Label = styled.div`
    width: auto;
    height: 20px;
    background: ${(props) => props.theme.colors.white};
    margin-top: 5px;
    display: flex;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.colors.grey3};
`;

const DiagramContainer = styled.div`
    display: grid;
    grid-template-columns: auto 300px;
`;

const NetworkDiagram = styled.div`
    background: ${(props) => props.theme.colors.grey1};
`;

const NetworkInformationConatainer = styled.div`
    background: ${(props) => props.theme.colors.white};
`;

const DisplayInfo = styled.div`
    height: 100%;
    width: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: repeat(7, 50px);
    /* grid-template-rows: */
`;

const DisplayInfoName = styled.div`
    grid-area: 1 / 1 / 2 / 3;
    display: flex;
    justify-content: center;
`;

const DisplayInforLabel = styled.div`
    font-size: 15px;
`;

const DisplayInfoValue = styled.div`
    font-size: 15px;
`;

const DiagramName = styled.div`
    margin: 10px;
    font-size: 25px;
`;

const Button = styled.button`
    width: 80px;
    height: 30px;
    font-size: 10px;
    /* padding: 3px; */
    color: ${props => props.theme.colors.white};
    background: ${props => props.theme.colors.violet};
    cursor: pointer;
`

const NetworkIndex = () => {
    const [Id, setId] = useState<string>('');
    const [translate, containerRef] = useCenteredContainer();
    const nodeSize = { x: 200, y: 200 };

    const test = (id: any) => {
        setId(id);
    };

    const SvgSelector = (device: string) => {
        switch (device) {
            case 'Switch':
                return <SvgSwitch />;
            case 'Router':
                return <SvgRouter />;
            case 'Pc':
                return <SvgComputer />;
            case 'Server':
                return <SvgServer />;
            case 'Printer':
                return <SvgPrinter />;
            case 'Internet':
                return <SvgInternet />;
            default:
                return <SvgInternet />;
        }
    };

    const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
        <g
            onClick={() => {
                test(nodeDatum?.id);
            }}>
            <rect width='20' height='20' fill='none' stroke='none' x='-100' />

            <foreignObject y='60' x='-80' width='150' height='200'>
                <LabelContainer>
                    <Label>{nodeDatum?.name}</Label>
                    {nodeDatum?.ipaddress && (
                        <Label>{nodeDatum?.ipaddress}</Label>
                    )}
                </LabelContainer>
            </foreignObject>
            {SvgSelector(nodeDatum?.name)}
        </g>
    );

    return (
        <>
            <DiagramName>Network diagram</DiagramName>
            <DiagramContainer>
                <NetworkDiagram>
                    <Container ref={containerRef}>
                        <Tree
                            translate={translate}
                            data={orgChart}
                            nodeSize={nodeSize}
                            orientation='vertical'
                            collapsible={false}
                            renderCustomNodeElement={renderRectSvgNode}
                        />
                    </Container>
                </NetworkDiagram>
                <NetworkInformationConatainer>
                    <DisplayInfo>
                        <DisplayInfoName>Node infomrations</DisplayInfoName>
                        <DisplayInforLabel>Title:</DisplayInforLabel>
                        <DisplayInfoValue>ClinetPC1</DisplayInfoValue>
                        <DisplayInforLabel>
                            Last status changed:
                        </DisplayInforLabel>
                        <DisplayInfoValue>2021.04.01</DisplayInfoValue>
                        <DisplayInforLabel>IP address:</DisplayInforLabel>
                        <DisplayInfoValue>10.0.1.50</DisplayInfoValue>
                        <DisplayInforLabel>Prefix:</DisplayInforLabel>
                        <DisplayInfoValue>28</DisplayInfoValue>
                        {/* <DisplayInforLabel>Total connected:</DisplayInforLabel>
                        <DisplayInfoValue></DisplayInfoValue> */}
                        <Button>View device</Button>
                        <DisplayInfoValue></DisplayInfoValue>
                    </DisplayInfo>
                </NetworkInformationConatainer>
            </DiagramContainer>
        </>
    );
};

export default NetworkIndex;
