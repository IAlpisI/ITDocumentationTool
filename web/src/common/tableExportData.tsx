import { person, general } from './tableExports';



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
    }
};
