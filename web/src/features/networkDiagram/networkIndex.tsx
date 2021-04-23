import Tree from 'react-d3-tree';
import 'react-tree-graph/dist/style.css';
import { data } from './data';
import styled from 'styled-components';
import './test.css';
import SvgTest from './svgTest';
import { useState } from 'react';

const Container = styled.div`
    height: 100vh;
`;

const orgChart = {
    name: 'Internet',
    id: 'test55',
    children: [
        {
            name: 'Router',
            children: [
                {
                    name: 'Switch',
                    children: [
                        {
                            name: 'Pc'
                        }
                    ]
                },
                {
                    name: 'Switch',
                    children: [
                        {
                            name: 'Pc'
                        }
                    ]
                }
            ]
        }
    ]
};



const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 25px 0 0 5px;
`;

const Label = styled.div`
    width: auto;
    height: 20px;
    background: white;
    margin-top: 5px;
`;

const DiagramContainer = styled.div`
    display: grid;
    grid-template-columns: auto 300px;
`;

const NetworkDiagram = styled.div`
    background: white;
`;

const NetworkInformationConatainer = styled.div`
    background: white;
    border-left: 2px solid grey;
`;

const DisplayInfo = styled.div`
    display: flex;
`

// const ImageSwitch(param) {
//     switch (param) {
//         case value:

//             break;

//         default:
//             break '';
//     }
// }




const NetworkIndex = () => {

    const [Id, setId] = useState<string>('')

    const test = (id: any) => {
        setId(id);
    };


    const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
        <g
            onClick={() => {
                test(nodeDatum?.id);
            }}>
            {/* <rect width='20' height='20' x='-10' onClick={toggleNode} /> */}
            <SvgTest />
            <foreignObject width='100' height='200'>
                <LabelContainer>
                    <Label>{nodeDatum?.name}</Label>
                    <Label>168.25.45.26</Label>
                </LabelContainer>
            </foreignObject>
            {/* <rect width="20" height="20" x="-10" onClick={toggleNode} />
          <IpName fill="black" strokeWidth="1" x="20">
            {nodeDatum.name}
          </IpName>
          {nodeDatum.attributes?.department && (
            <text fill="black" x="20" dy="20" strokeWidth="1">
              Department: {nodeDatum.attributes?.department}
            </text>
          )} */}
        </g>
    );
    

    return (
        <>
            <div>{'Network diagram'}</div>
            <DiagramContainer>
                <NetworkDiagram>
                    <Container>
                        <Tree
                            data={orgChart}
                            orientation='vertical'
                            collapsible={false}
                            renderCustomNodeElement={renderRectSvgNode}
                        />
                    </Container>
                </NetworkDiagram>
                <NetworkInformationConatainer>
                    <DisplayInfo>
                        {Id}
                    </DisplayInfo>
                </NetworkInformationConatainer>
            </DiagramContainer>
        </>
    );
};

export default NetworkIndex;
