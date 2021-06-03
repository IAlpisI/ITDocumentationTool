export const checkMask = (mask :string) => {
    const masks = mask.split('.');
    if(masks.length !== 4) return false;

    for(let x=0;x<4;x++){
        if(parseInt(masks[x]) < 0 || parseInt(masks[x]) > 255) return false;
    }

    return true;
}