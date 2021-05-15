import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard'
    },
    {
        title: 'Hardware',
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Servers',
                path: '/server'
            },
            {
                title: 'Printers',
                path: '/printer'
            },
            {
                title: 'Clients',
                path: '/client'
            },
            {
                title: 'Routers',
                path: '/router'
            },
            {
                title: 'Switches',
                path: '/switch'
            }
        ]
    },
    {
        title: 'Applications',
        path: '/application'
    },
    {
        title: 'People',
        path: '/people'
    },
    {
        title: 'Cables',
        path: '/cable'
    },
    {
        title: 'Floor plans',
        path: '/map'
    },

    {
        title: 'Layer three networks',
        path: '/layerthreenetwork'
    },
    {
        title: 'Network diagram',
        path: '/networkDiagram'
    }
];
