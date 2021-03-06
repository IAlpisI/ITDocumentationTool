import { useEffect } from 'react'
import GeneralTab from '../../common/Tabs/generalTab'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import {fetchApplication} from './applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import LicenseKeyIndex from './licenseKeyIndex'

const ApplicationDetails = () => {

    const dispatch = useDispatch();
    const application = useSelector((state: any) => state.application.singleApplication);
    const {id} = useParams<{id:string}>();

    useEffect(() => {
        dispatch(fetchApplication(id));
    }, [dispatch, id]);

    return (
        <div className="container">
        <Tabs>
          <TabPane name="General" key="1" id='general'>
          { application.status === 'completed' && <GeneralTab {...application.data.general} />}
          </TabPane>
          <TabPane name="License Key" key="3" id='license'>
            { application.status === 'completed' &&<LicenseKeyIndex />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default ApplicationDetails
