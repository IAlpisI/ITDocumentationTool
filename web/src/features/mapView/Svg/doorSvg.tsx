export const DoorSvg = () => {
    return (
        <>
            <svg x='0px' y='0px' viewBox='-100 -100 512 512'>
                <clipPath id='cut-off-bottom'>
                    <rect x='-10' y='-0' width='300' height='310' />
                </clipPath>

                <circle
                    stroke='black'
                    strokeWidth='20'
                    fill='white'
                    cx='310'
                    cy='300'
                    r='300'
                    clipPath='url(#cut-off-bottom)'
                />
                <rect x='0' y='300' width='300' height='30' />
                <rect x='270' y='000' width='30' height='300' />
            </svg>
        </>
    );
};

export const WallSvg = () => {
    return (
        <>
            <svg x='0px' y='0px' viewBox='0 -200 512 512'>
                <rect x='0' y='0' width='500' height='100' fill='black' />
            </svg>
        </>
    );
};

export const TableSvg = () => {
    return (
        <>
            <svg x='0px' y='0px' viewBox='0 -200 512 512'>
                <rect
                    x='30'
                    y='0'
                    width='450'
                    height='200'
                    fill='white'
                    stroke='black'
                    strokeWidth='10'
                />
            </svg>
        </>
    );
};

export const WindowSvg = () => {
    return (
        <>
            <svg x='0px' y='0px' viewBox='0 -200 512 512'>
                <rect
                    x='30'
                    y='0'
                    width='450'
                    height='100'
                    fill='white'
                    stroke='black'
                    strokeWidth='10'
                />
                <rect
                    x='30'
                    y='0'
                    width='450'
                    height='50'
                    fill='black'
                />
            </svg>
        </>
    );
};
