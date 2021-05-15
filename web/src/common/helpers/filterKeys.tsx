export const Convert = ( data: any, filterKeys: any) => {
    const value: any = [...Array(Object.keys(data).length)];
    let assing:any = [];

    value.map((_: any, x: any) =>
        assing.push(
            Object.fromEntries(
                Object.entries(data[x]).filter(filterKeys)
            )
        )
    );

    return assing;
};
