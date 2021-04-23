import { useEffect } from 'react'
import GeneralTab from '../../common/Tabs/generalTab'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import FormFactor from '../../common/Tabs/formFactorTab'
import PowerConsumer from '../../common/Tabs/powerConsumerTab'
import {fetchSwitch} from './switchSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'


const WorkerDetails = () => {

  const dispatch = useDispatch();
  const worker = useSelector((state: any) => state.worker.singleWorker);
  const {id} = useParams<{id:string}>();

  useEffect(() => {
      dispatch(fetchSwitch(id));
  }, [dispatch, id]);

    return (
      <div className="container">
        <Tabs>
          <TabPane name="General" key="1">
          { worker.status === 'completed' && <GeneralTab {...worker.data.general} />}
          </TabPane>
          <TabPane name="Power consumer" key="2">
            { worker.status === 'completed' &&<PowerConsumer  {...worker.data.powerconsumer} />}
          </TabPane>
          <TabPane name="Form factor" key="2">
            { worker.status === 'completed' &&<FormFactor  {...worker.data.formfactor} />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default WorkerDetails
