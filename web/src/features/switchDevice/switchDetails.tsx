import { useEffect } from 'react'
import GeneralTab from '../../common/Tabs/generalTab'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import FormFactor from '../../common/Tabs/formFactorTab'
import SwitchTab from '../../common/Tabs/switchTab'
import PowerConsumer from '../../common/Tabs/powerConsumerTab'
import {fetchSwitch} from './switchSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'


const SwitchDetails = () => {

  const dispatch = useDispatch();
  const switchDevice = useSelector((state: any) => state.switch.singleSwitch);
  const {id} = useParams<{id:string}>();

  useEffect(() => {
      dispatch(fetchSwitch(id));
  }, [dispatch, id]);

    return (
      <div className="container">
        <Tabs>
          <TabPane name="General" key="1">
          { switchDevice.status === 'completed' && <GeneralTab {...switchDevice.data.general} />}
          </TabPane>
          <TabPane name="Switch" key="1">
          { switchDevice.status === 'completed' && <SwitchTab {...switchDevice.data} />}
          </TabPane>
          <TabPane name="Power consumer" key="2">
            { switchDevice.status === 'completed' &&<PowerConsumer  {...switchDevice.data.powerconsumer} />}
          </TabPane>
          <TabPane name="Form factor" key="2">
            { switchDevice.status === 'completed' &&<FormFactor  {...switchDevice.data.formfactor} />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default SwitchDetails
