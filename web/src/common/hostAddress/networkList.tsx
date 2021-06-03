import * as Module from '../Styles/tabList.style';
import { Button } from '../Styles/common.style';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
    createNetwork,
    updateNetwork,
    fetchRouter,
    fetchRouters
} from '../../features/routerDevice/routerSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataAcceptWindow } from '../popWindows';
import * as FormStyle from '../Styles/form.style';
import TableContainer from '../TableContainer';
import { Header, RouterNetworkLinks, RouterHeader } from './networkData';
import { Convert } from '../helpers/filterKeys';
import ListOfItems from '../listOfItems';
import { fetchLayerThreeNetworks } from '../../features/layerThreeNetwork/layerThreeNetworkSlice';

const NetworkList = ({networkList}:any) => {
    const methods = useForm();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    const [showNetwork, setNetwork] = useState<boolean>(false);
    const layerThreeNetwork = useSelector(
        (state: any) => state.layerThreeNetwork.layerThreeNetworkList
    );

    useEffect(() => {
        dispatch(fetchLayerThreeNetworks());
    }, [dispatch]);

    const toggleAddNetwork = () => {
        setNetwork((showNetwork) => !showNetwork);
        methods.reset();
    };

    function filterRouterKeys([key, _]: any) {
        return key !== 'general' && key !== 'routerDeviceId';
    }

    function filterNetworkKeys([key, _]: any) {
        return key !== 'prefix' && key !== 'generalId';
    }

    function filterRouterById(x: any) {
        return x.routerDeviceId === null;
    }

    const removeNetwork = (networkId: number) => {
        const network = layerThreeNetwork.data.find(
            (x: any) => x.id === networkId
        );
        let temp = { ...network };
        temp.routerDeviceId = null;
        updateNetworkAsync(temp);
    };

    const addNetwork = (networkId: number) => {
        const network = layerThreeNetwork.data.find(
            (x: any) => x.id === networkId
        );
        let temp = { ...network };
        temp.routerDeviceId = id;
        updateNetworkAsync(temp);
    };

    const updateNetworkAsync = async (network: any) => {
        await dispatch(updateNetwork(network));
        await dispatch(fetchLayerThreeNetworks());
        await dispatch(fetchRouter(id))
    };

    console.log(networkList);
    console.log(layerThreeNetwork.data);

    return (
        <>
            {showNetwork && layerThreeNetwork.data && (
                <DataAcceptWindow>
                    <ListOfItems
                        items={Convert(
                            layerThreeNetwork.data,
                            filterNetworkKeys
                        )}
                        activasionFunction={addNetwork}
                        headers={RouterHeader}
                        filterFunction={filterRouterById}
                    />
                    <Button
                        onClick={toggleAddNetwork}
                        margin={'10px 0 0 -320px'}
                        padding={'5px'}
                        height={'25px'}
                        width={'80px'}
                        background>
                        Close
                    </Button>
                </DataAcceptWindow>
            )}
            <Module.Container>
                <Module.ContentLayout>
                    <Module.TableFlow>
                        <Button
                            onClick={toggleAddNetwork}
                            padding={'5px'}
                            height={'25px'}
                            width={'150px'}
                            background>
                            Add network
                        </Button>
                        <TableContainer
                            tableList={Convert(
                                networkList,
                                filterRouterKeys
                            )}
                            tableHeader={Header}
                            tableLinks={RouterNetworkLinks}
                            tableButtons={false}
                            tableNameActive={false}
                            displayEdit={false}
                            fetchOne={fetchRouter}
                            displayDelete={false}
                            displayRemove={true}
                            removeActivasionFunction={removeNetwork}
                            removePadding
                        />
                    </Module.TableFlow>
                </Module.ContentLayout>
            </Module.Container>
        </>
    );
};

export default NetworkList;
