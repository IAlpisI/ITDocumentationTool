export const Header = [

    {
        entityColumn: 'specification',
        headerName: 'Specification'
    },
    {
        entityColumn: 'manufacturer',
        headerName: 'Manufacturer'
    },
    {
        entityColumn: 'action',
        headerName: 'Action'
    },
]

export const HeaderForApp = [
    'Application', 'Manufacturer'
]

export const HeaderForLicenseAdd = [
    'Serial', 'Key'
]

// export const HeaderForLicense = [
//     {
//         entityColumn: 'serial',
//         headerName: 'Serial'
//     },
//     {
//         entityColumn: 'key',
//         headerName: 'Key'
//     },
//     {
//         entityColumn: 'action',
//         headerName: 'Action'
//     },
// ]

export const LicenseHeader = [
    {
        entityColumn: 'keyInformation',
        headerName: 'Key'
    },
    {
        entityColumn: 'serial',
        headerName: 'Serial'
    },
    {
        entityColumn: 'action',
        headerName: 'Action'
    },
]

export const Links =
{
    editLink: 'application/edit/',
    deleteLink: 'application',
    viewLink: '/application/detail/',
    formLink: 'application/form',
    index: 'application'
}

export const LicenseLinks = {
    deleteLink: 'application/license',
    editLink: 'application/edit/',
    viewLink: 'application/detail/',
    formLink: 'application/form',
    index: 'application'
}

export const scrollIds = ['General', 'Specification', 'Save']