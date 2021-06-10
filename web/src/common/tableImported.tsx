
const TableImported = ( name: any, importedData: any) => {
    let exportData:any = []

    switch (name) {
        case 'person':
            importedData.forEach(async (element: any) => {
                let person = {
                    fullName: element.fullName,
                    emailAddress: element.emailAddress,
                    companyNumber: element.companyNumber,
                    personalNumber: element.personalNumber,
                    general: {
                        title: element.title,
                        purpose: element.purpose,
                        status: element.status,
                        tag: element.tags
                    }
                };
                exportData.push(person);
            });
    
        return exportData;
        case 'switch':
            importedData.forEach(async (data: any) => {
                let switchDevice = {
                    vlan: data.vlan,
                    role: data.role,
                    spanningtree: data.spanningtree,
                    general: {
                        title: data.title,
                        purpose: data.purpose,
                        status: data.status,
                        tag: data.tags,
                        description: data.generalDescription
                    },
                    formfactor: {
                        name: data.name,
                        dimesnsionunit: data.dimensionUnit,
                        width: data.width,
                        height: data.height,
                        depth: data.depth,
                        weight: data.weight,
                        weightmeasure: data.weightMeasure,
                        description: data.fomrFactorDescription
                    },
                    powerconsumer: {
                        title: data.title,
                        manufacturer: data.powerConsumerManufacturer,
                        powermodel: data.powermodel,
                        volt: data.volt,
                        watt: data.watt,
                        ampere: data.ampere,
                        description: data.powerConsumerDescription
                    },
                };
                exportData.push(switchDevice);
            });
    
        return exportData;
        case 'router':
            importedData.forEach(async (data: any) => {
                let routerDevice = {
                    routingprotocol: data.routingProtocol,
                    gatewayaddress: data.gatewayAddress,
        
                    general: {
                        title: data.title,
                        purpose: data.purpose,
                        status: data.status,
                        tag: data.tags,
                        description: data.generalDescription
                    },
                    formfactor: {
                        name: data.name,
                        dimesnsionunit: data.dimensionUnit,
                        width: data.width,
                        height: data.height,
                        depth: data.depth,
                        weight: data.weight,
                        weightmeasure: data.weightMeasure,
                        description: data.fomrFactorDescription
                    },
                    powerconsumer: {
                        title: data.title,
                        manufacturer: data.powerConsumerManufacturer,
                        powermodel: data.powermodel,
                        volt: data.volt,
                        watt: data.watt,
                        ampere: data.ampere,
                        description: data.powerConsumerDescription
                    },
                };
                exportData.push(routerDevice);
            });
    
        return exportData;
        case 'printer':
            importedData.forEach(async (data: any) => {
                let printer = {
                    type: data.type,
                    colored: data.colored,
                    duplex: data.duplex,
                    emulation: data.emulation,
                    paperformat: data.paperFormat,
                    general: {
                        title: data.title,
                        purpose: data.purpose,
                        status: data.status,
                        tag: data.tags,
                        description: data.generalDescription
                    },
                };
                exportData.push(printer);
            });
    
        return exportData;
        case 'server':
            importedData.forEach(async (data: any) => {
                let server = {
                    general: {
                        title: data.title,
                        purpose: data.purpose,
                        status: data.status,
                        tag: data.tags,
                        description: data.generalDescription
                    },
                    formfactor: {
                        name: data.name,
                        dimesnsionUnit: data.dimensionUnit,
                        width: data.width,
                        height: data.height,
                        depth: data.depth,
                        weight: data.weight,
                        weightmeasure: data.weightMeasure,
                        description: data.fomrFactorDescription
                    },
                };
                exportData.push(server);
            });
    
        return exportData;
        case 'client':
            importedData.forEach(async (data: any) => {
                let person = {
                    general: {
                        title: data.title,
                        purpose: data.purpose,
                        status: data.status,
                        tag: data.tags,
                        description: data.generalDescription
                    },
                    powerconsumer: {
                        title: data.powerConsumerTitle,
                        manufacturer: data.powerConsumerManufacturer,
                        powermodel: data.powermodel,
                        volt: data.volt,
                        watt: data.watt,
                        ampere: data.ampere,
                        description: data.powerConsumerDescription
                    },
                };
                exportData.push(person);
            });
    
        return exportData;
    }
};

export default TableImported;
