import store from './store';
import { Provider } from 'react-redux';
import DCandidates from '../features/dbcandidates/dcandidate';
import Sidebar from '../features/sidebar/Sidebar';
import Navbar from '../features/sidebar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import Login from '../features/user/login';
import WorkerIndex from '../features/workers/WorkerIndex';
import styled from 'styled-components';
import WorkerForm from '../features/workers/workerForm';
import WorkerDetails from '../features/workers/workerDetails';
import NotFound from '../common/notFound';
import PrivateRoute from '../common/privateRoute';
import NetworkDiagram from '../features/networkDiagram/networkIndex';
import ServerIndex from '../features/serverDevice/serverIndex';
import ServerForm from '../features/serverDevice/serverForm';
import ServerDetails from '../features/serverDevice/serverDetails';
import ClientIndex from '../features/clientPc/clientPcIndex';
import ClientForm from '../features/clientPc/clientPcForm';
import ClientDetails from '../features/clientPc/clientPcDetails';
import ApplicationIndex from '../features/application/applicationIndex';
import ApplicationForm from '../features/application/applicationForm';
import ApplicationDetails from '../features/application/applicationDetails';
import MapIndex from '../features/mapView/mapIndex';
import LayerThreeNetworkIndex from '../features/layerThreeNetwork/layerThreeNetworkIndex';
import LayerThreeNetworkForm from '../features/layerThreeNetwork/layerThreeNetworkForm';
import LayerThreeNetworkDetail from '../features/layerThreeNetwork/layerThreeNetworkDetail';

export const SidebarStyle = styled.div`
    display: flex;
    flex-direction: row;
`;

export const NavbarStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

function App() {
    return (
        <Router>
            <SidebarStyle>
                <Sidebar />
                <NavbarStyle>
                    <Navbar />
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <Route path='/dashboard' exact component={Dashboard} />
                        <Route path='/map' exact component={MapIndex} />
                        {/*LayerThreeNetwork*/}
                        <Route
                            path='/layerthreenetwork'
                            exact
                            component={LayerThreeNetworkIndex}
                        />
                        <Route
                            path='/layerthreenetwork/form'
                            exact
                            component={LayerThreeNetworkForm}
                        />
                        <Route
                            path='/layerthreenetwork/detail/:id'
                            exact
                            component={LayerThreeNetworkDetail}
                        />
                        <Route
                            path='/layerthreenetwork/edit/:id'
                            exact
                            component={LayerThreeNetworkForm}
                        />
                        {/*Application*/}
                        <Route
                            path='/application'
                            exact
                            component={ApplicationIndex}
                        />
                        <Route
                            path='/application/form'
                            exact
                            component={ApplicationForm}
                        />
                        <Route
                            path='/application/detail/:id'
                            exact
                            component={ApplicationDetails}
                        />
                        <Route
                            path='/application/edit/:id'
                            exact
                            component={ApplicationForm}
                        />
                        {/* CLIENT */}
                        <Route path='/client' exact component={ClientIndex} />
                        <Route
                            path='/client/form'
                            exact
                            component={ClientForm}
                        />
                        <Route
                            path='/client/detail/:id'
                            exact
                            component={ClientDetails}
                        />
                        <Route
                            path='/client/edit/:id'
                            exact
                            component={ClientForm}
                        />
                        {/* SERVER */}
                        <Route path='/server' exact component={ServerIndex} />
                        <Route
                            path='/server/form'
                            exact
                            component={ServerForm}
                        />
                        <Route
                            path='/server/detail/:id'
                            exact
                            component={ServerDetails}
                        />
                        <Route
                            path='/server/edit/:id'
                            exact
                            component={ServerForm}
                        />
                        {/* People */}
                        <PrivateRoute
                            path='/people'
                            exact
                            component={WorkerIndex}
                        />
                        <Route
                            path='/people/form'
                            exact
                            component={WorkerForm}
                        />
                        <Route
                            path='/people/detail/:id'
                            exact
                            component={WorkerDetails}
                        />
                        <Route
                            path='/people/edit/:id'
                            exact
                            component={WorkerForm}
                        />
                        <Route
                            path='/networkdiagram'
                            exact
                            component={NetworkDiagram}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </NavbarStyle>
            </SidebarStyle>
        </Router>
    );
}

export default App;
