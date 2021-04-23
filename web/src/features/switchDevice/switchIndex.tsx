import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSwitches } from './switchSlice';
import { Header, Links } from './switchData';
import TableContainer from '../../common/TableContainer';

function SwitchIndex() {
    const dispatch = useDispatch();
    const switchList = useSelector((state: any) => state.switch.switchList);

    useEffect(() => {
        dispatch(fetchSwitches());
    }, [dispatch]);

    return (
        <TableContainer
            tableList={switchList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'people'}
        />
    );
}

export default SwitchIndex;
