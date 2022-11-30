import React from 'react';

const Marker = (props: any) => {
    const { name } = props;
    return (
        <div className="marker"
            style={{ cursor: 'pointer' }}
            title={name}
        >
            <img src={require('../img/marker.png')} alt="" />
        </div>
    );
};

export default Marker;