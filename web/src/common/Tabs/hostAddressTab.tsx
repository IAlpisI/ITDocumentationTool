import * as Module from '../Styles/detail.style';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { useHistory} from 'react-router-dom';
import { fetchLayerThreeNetwork } from '../../features/layerThreeNetwork/layerThreeNetworkSlice';
import { useDispatch, useSelector } from 'react-redux';

export type HostAddressProps = {
    address?: string;
    networkId: number;
};


const HostAddressTab = ({ address, networkId }: HostAddressProps) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const layerThreeNetwork = useSelector( (state: any) => state.layerThreeNetwork.layerThreeNetwork);

    useEffect(() => {
        console.log(networkId)
        if (networkId) dispatch(fetchLayerThreeNetwork(networkId));
    }, [dispatch, networkId]);

    return (
        <Module.Container>
            <Module.ComponentName>Host address</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Address:</Module.ObjectName>
                <Module.ObjectData>{address}</Module.ObjectData>
                <Module.ObjectName>Network:</Module.ObjectName>
                {layerThreeNetwork.status === 'completed' && <Module.ObjectLinkName
                    onClick={() => {
                        history.push(`/layerthreenetwork/detail/${layerThreeNetwork.data.id}`)
                    }}
                >{layerThreeNetwork.data.netIp}</Module.ObjectLinkName> }
            </Module.DetailGrid>
        </Module.Container>
    );
};

export default HostAddressTab;
