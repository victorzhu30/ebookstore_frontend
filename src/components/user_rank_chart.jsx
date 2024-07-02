import React from 'react';
import { Pie } from '@ant-design/plots';

export default  function DemoPie ( {infos} ) {
    if (infos.length > 0 ){
        console.log(typeof(infos[0].number));
    }
    const data = infos.map(info => ({
        type: info.title,
        value: info.number,
    }));
    console.log(data);
    if (data.length > 0 ) {
        console.log(typeof (data[0].value));
    }

    const config = {
        data: data,
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        label: {
            text: (d) => `${d.value}`,
            content: ({ value }) => `${value}`,
            position: 'spider',
        },
    };
    return <Pie {...config} />;
};
