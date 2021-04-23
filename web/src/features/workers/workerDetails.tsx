import { useEffect } from 'react'
import GeneralTab from '../../common/Tabs/generalTab'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import WorkerTab from '../../common/Tabs/workerTab'
import {fetchWorker} from './workerSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'


const WorkerDetails = () => {

  const dispatch = useDispatch();
  const worker = useSelector((state: any) => state.worker.singleWorker);
  const {id} = useParams<{id:string}>();

  useEffect(() => {
      dispatch(fetchWorker(id));
  }, [dispatch, id]);

    return (
      <div className="container">
        <Tabs>
          <TabPane name="General" key="1">
          { worker.status === 'completed' && <GeneralTab {...worker.data.general} />}
          </TabPane>
          <TabPane name="Person" key="2">
            { worker.status === 'completed' &&<WorkerTab  {...worker.data} />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default WorkerDetails
