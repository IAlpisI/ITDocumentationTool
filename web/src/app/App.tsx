import Sidebar from '../features/sidebar/Sidebar';
import Navbar from '../features/sidebar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import LoginForm from '../features/user/login';
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
import SwitchIndex from '../features/switchDevice/switchIndex';
import SwitchForm from '../features/switchDevice/swithcForm';
import SwitchDetails from '../features/switchDevice/switchDetails';
import RouterIndex from '../features/routerDevice/routerIndex';
import RouterForm from '../features/routerDevice/routerForm';
import RouterDetails from '../features/routerDevice/routerDetails';
import PrinterIndex from '../features/printer/printerIndex';
import PrinterForm from '../features/printer/printerForm';
import PrinterDetails from '../features/printer/printerDetails';
import CableIndex from '../features/cables/cableIndex';
import CableForm from '../features/cables/cableForm';
import CableDetails from '../features/cables/cableDetails';
import DefectedItems from '../features/dashboard/defectedItems';
import Search from '../features/dashboard/search';


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
        <>
            <Router>
                <Switch>
                    <Route path='/login' exact component={LoginForm} />
                    <Route component={DefaultContainer} />
                </Switch>
            </Router>
        </>
    );
}

const DefaultContainer = () => (
    <SidebarStyle>
        <Sidebar />
        <NavbarStyle>
            <Navbar />
            <Route path='/map' exact component={MapIndex} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/' exact component={Dashboard} />

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
            <Route path='/application' exact component={ApplicationIndex} />
            <Route path='/application/form' exact component={ApplicationForm} />
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
            <Route path='/client/form' exact component={ClientForm} />
            <Route path='/client/detail/:id' exact component={ClientDetails} />
            <Route path='/client/edit/:id' exact component={ClientForm} />
            {/* SERVER */}
            <Route path='/server' exact component={ServerIndex} />
            <Route path='/server/form' exact component={ServerForm} />
            <Route path='/server/detail/:id' exact component={ServerDetails} />
            <Route path='/server/edit/:id' exact component={ServerForm} />
            {/* Switch */}
            <Route path='/switch' exact component={SwitchIndex} />
            <Route path='/switch/form' exact component={SwitchForm} />
            <Route path='/switch/detail/:id' exact component={SwitchDetails} />
            <Route path='/switch/edit/:id' exact component={SwitchForm} />
            {/* People */}
            <PrivateRoute path='/people' exact component={WorkerIndex} />
            <Route path='/people/form' exact component={WorkerForm} />
            <Route path='/people/detail/:id' exact component={WorkerDetails} />
            <Route path='/people/edit/:id' exact component={WorkerForm} />
            <Route path='/networkdiagram' exact component={NetworkDiagram} />
            {/* Router */}
            <Route path='/router' exact component={RouterIndex} />
            <Route path='/router/form' exact component={RouterForm} />
            <Route path='/router/detail/:id' exact component={RouterDetails} />
            <Route path='/router/edit/:id' exact component={RouterForm} />
            {/* Printer */}
            <Route path='/printer' exact component={PrinterIndex} />
            <Route path='/printer/form' exact component={PrinterForm} />
            <Route
                path='/printer/detail/:id'
                exact
                component={PrinterDetails}
            />
            <Route path='/printer/edit/:id' exact component={PrinterForm} />
            {/* Cable */}
            <Route path='/cable' exact component={CableIndex} />
            <Route path='/cable/form' exact component={CableForm} />
            <Route path='/cable/detail/:id' exact component={CableDetails} />
            <Route path='/cable/edit/:id' exact component={CableForm} />
            {/* defected items */}
            <Route path='/defected' exact component={DefectedItems} />
            {/* defected items */}
            <Route path='/search' exact component={Search} />

            {/* <Route component={NotFound} /> */}
        </NavbarStyle>
    </SidebarStyle>
);

export default App;
