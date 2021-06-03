import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayerThreeNetworks } from './layerThreeNetworkSlice';
import { Header, Links } from './layerThreeNetworkData';
import TableContainer from '../../common/TableContainer';
import {Convert } from '../../common/helpers/filterKeys';

function LayerThreeNetworkIndex() {
    const dispatch = useDispatch();
    const layerThreeNetwork = useSelector((state: any) => state.layerThreeNetwork.layerThreeNetworkList);

    useEffect(() => {
        dispatch(fetchLayerThreeNetworks());
    }, [dispatch]);

    function filter([key, _]: any) {
        return key !== 'routerDeviceId';
    }

    return (
        <TableContainer
            tableList={Convert(layerThreeNetwork.data, filter)}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Networks'}
            buttonName={'network'}
            tableExportButtons={false}
            fetchData={fetchLayerThreeNetworks}
        />
    );
}

export default LayerThreeNetworkIndex;
