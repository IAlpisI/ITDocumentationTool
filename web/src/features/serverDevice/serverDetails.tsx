import { useEffect } from 'react'
import GeneralTab from '../../common/Tabs/generalTab'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import FormFactor from '../../common/Tabs/formFactorTab'
import {fetchServer} from './serverSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'


const ServerDetails = () => {

  const dispatch = useDispatch();
  const server = useSelector((state: any) => state.worker.singleServer);
  const {id} = useParams<{id:string}>();

  useEffect(() => {
      dispatch(fetchServer(id));
  }, [dispatch, id]);

    return (
      <div className="container">
        <Tabs>
          <TabPane name="General" key="1">
          { server.status === 'completed' && <GeneralTab {...server.data.general} />}
          </TabPane>
          <TabPane name="Person" key="2">
            { server.status === 'completed' &&<FormFactor  {...server.data.formfactor} />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default ServerDetails