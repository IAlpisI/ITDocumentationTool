import { useDispatch, useSelector } from 'react-redux';


const TableImported = ( name: any, importedData: any) => {
    let data:any = []

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
                // const test = await dispatch(createWorker(person));
                // console.log("kitas "+worker);
                data.push(person);
            });
    
        return data;
    }
};

export default TableImported;
