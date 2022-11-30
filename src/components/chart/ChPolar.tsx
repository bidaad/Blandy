import React from 'react';
import { Bar, Polar } from 'react-chartjs-2';

const data = {
    datasets: [{
        data: [
            40,
            30,
            10,
            10,
            10
        ],
        backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB'
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
    ]
};




const ChPolar = (props: any) => (

        <Polar data={data} />


);

export default ChPolar
