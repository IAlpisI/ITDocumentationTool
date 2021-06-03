
const TableImported = ( name: any, importedData: any) => {
    let data1:any = []

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
                data1.push(person);
            });
    
        return data1;
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
                data1.push(switchDevice);
            });
    
        return data1;
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
                data1.push(routerDevice);
            });
    
        return data1;
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
                data1.push(printer);
            });
    
        return data1;
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
                data1.push(server);
            });
    
        return data1;
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
                data1.push(person);
            });
    
        return data1;
    }
};

export default TableImported;
