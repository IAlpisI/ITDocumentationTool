import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSwitches, ExportSwitch } from './switchSlice';
import { Header, Links } from './switchData';
import TableContainer from '../../common/TableContainer';
import { general, switchDevice, formFactor, powerConsumer} from '../../common/tableExports';

function SwitchIndex() {
    const dispatch = useDispatch();
    const switchList = useSelector((state: any) => state.switch.switchList);
    const exportList = useSelector((state: any) => state.switch.exportList);
    const exportTemplate = [{...general, ...switchDevice, ...formFactor, ...powerConsumer}]

    useEffect(() => {
        dispatch(fetchSwitches());
        dispatch(ExportSwitch());
    }, [dispatch]);


    return (
        <TableContainer
            exportData={exportList.data}
            fetchData={fetchSwitches}
            tableList={switchList.data}
            tableHeader={Header}
            tableLinks={Links}
            tableName={'Switches'}
            buttonName={'switch'}
            exportHeader={exportTemplate}
        />
    );
}

export default SwitchIndex;
