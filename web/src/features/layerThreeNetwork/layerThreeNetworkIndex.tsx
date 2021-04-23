import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayerThreeNetworks } from './layerThreeNetworkSlice';
import { Header, Links } from './layerThreeNetworkData';
import TableContainer from '../../common/TableContainer';

function LayerThreeNetworkIndex() {
    const dispatch = useDispatch();
    const layerThreeNetwork = useSelector((state: any) => state.layerThreeNetwork.layerThreeNetworkList);

    useEffect(() => {
        dispatch(fetchLayerThreeNetworks());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={layerThreeNetwork.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'networks'}
            buttonName={'network'}
        />
    );
}

export default LayerThreeNetworkIndex;
