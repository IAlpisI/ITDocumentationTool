import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TabUl = styled.ul`
    display: flex;
    flex-direction: row;
    padding-left: 100px;
    margin: 20px 0;
`

const TabLi = styled.div<{active:boolean}>`
    list-style-type: none;
    margin-right: 10px;
    padding: 10px;
    cursor: pointer;
    color: ${(props) => !props.active ? props.theme.colors.black : props.theme.colors.white};
    background: ${(props) => !props.active ? props.theme.colors.white : props.theme.colors.cyan};
    border: 2px solid ${(props) => props.theme.colors.grey1};
`

const Tabs = (props: any) => {
    const { children } = props;
    const [tabHeader, setTabHeader] = useState([]);
    const [childContent, setChildConent] = useState<any>({});
    const [active, setActive] = useState('');

    useEffect(() => {
        const headers:any = [];
        const childCnt:any = {};
        React.Children.forEach(children, (element:any) => {
            if (!React.isValidElement(element)) return;
            const { name }:any = element.props;
            const test:any = element.props;
            headers.push(name);
            childCnt[name] = test.children;
        });
        setTabHeader(headers);
        setActive(headers[0]);
        setChildConent({ ...childCnt });
    }, [props, children]);

    const changeTab = (name:any) => {
        setActive(name);
    };

    return (
        <TabContainer>
            <TabUl className='tab-header'>
                {tabHeader.map((item) => (
                    <TabLi
                        onClick={() => changeTab(item)}
                        key={item}
                        active={item === active}>
                        {item}
                    </TabLi>
                ))}
            </TabUl>
            <div className='tab-content'>
                {Object.keys(childContent).map((key) => {
                    if (key === active) {
                        return <div className='tab-child' key={key} >{childContent[key]}</div>;
                    } else {
                        return null;
                    }
                })}
            </div>
        </TabContainer>
    );
};
export default Tabs;
