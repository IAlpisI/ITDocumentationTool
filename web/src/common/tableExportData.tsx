import {
    person,
    formFactor,
    powerConsumer,
    routerDevice as router,
    switchDevice,
    clientDevice,
    printer,
    general
} from './tableExports';

export const TableImportData = (importedData: any, name?: string) => {
    if (importedData.length === 0) return false;
    let isCorrect = true;

    switch (name) {
        case 'person':
            const temp = { ...person, ...general };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in temp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
        case 'server':
            const serverTemp = { ...formFactor, ...general };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in serverTemp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
        case 'printer':
            const printerTemp = { ...general, ...printer };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in printerTemp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
        case 'switch':
            const switchTemp = { ...switchDevice, ...general, ...formFactor, ...powerConsumer };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in switchTemp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
        case 'router':
            const routerTemp = { ...router, ...general, ...formFactor, ...powerConsumer };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in routerTemp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
        case 'client':
            const clientTemp = { ...clientDevice, ...general, ...powerConsumer };
            importedData.forEach((element: any) => {
                const title = element.title;
                if (title === undefined || title.length === 0) {
                    isCorrect = false;
                    return false;
                }

                for (const prop in element) {
                    if (!(prop in clientTemp)) {
                        isCorrect = false;
                        return false;
                    }
                }
            });
            return isCorrect;
    }
};
