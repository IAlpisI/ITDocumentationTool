import * as Module from '../Styles/detail.style'

export type UserDetail = {
    name?: string;
    username?: string;
    password?: string;
    role?: string
};

const WorkerDetail = (props: UserDetail) => {
    return (
        <Module.Container>
            <Module.ComponentName>User</Module.ComponentName>
            <Module.DetailGrid>
                <Module.ObjectName>Full name:</Module.ObjectName>
                <Module.ObjectData>{props.name}</Module.ObjectData>
                <Module.ObjectName>Email address:</Module.ObjectName>
                <Module.ObjectData>{props.username}</Module.ObjectData>
                <Module.ObjectName>Company number:</Module.ObjectName>
                <Module.ObjectData>{props.password}</Module.ObjectData>
                <Module.ObjectName>Personla number:</Module.ObjectName>
                <Module.ObjectData>{props.role}</Module.ObjectData>
            </Module.DetailGrid>
        </Module.Container>
    );
}

export default WorkerDetail

