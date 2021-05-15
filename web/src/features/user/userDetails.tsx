import { useEffect } from 'react'
import TabPane from '../../common/Tabs/tabPane'
import Tabs from '../../common/Tabs/tabs'
import UserTab from '../../common/Tabs/userTab'
import {fetchUser} from './userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'


const WorkerDetails = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const {id} = useParams<{id:string}>();

  useEffect(() => {
      dispatch(fetchUser(id));
  }, [dispatch, id]);

    return (
      <div className="container">
        <Tabs>
          <TabPane name="Person" key="2">
            { currentUser.status === 'completed' &&<UserTab  {...currentUser.data} />}
          </TabPane>
        </Tabs>
      </div>
    )
}

export default WorkerDetails
