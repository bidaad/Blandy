import React, { useState, useEffect } from 'react'
import changeEnc from '../helper/changeEnc';

interface IncDecProps {
    initVal: number ,
    UpdateCount: (newCount:number) => void
}


const IncDec = (props: IncDecProps) => {
    const [counter, setCounter] = useState(props.initVal);
    
    useEffect(() => {
        console.log('new val=' + props.initVal);
        
        setCounter(props.initVal)
        
    }, [props.initVal]);

    function decCounter(){
        if(counter > 1)
        {
            setCounter(counter - 1)
            props.UpdateCount(counter - 1);
        }
    }

    function incCounter()
    {
        props.UpdateCount(counter + 1);
        setCounter(counter + 1)
    }
    return (
        <div className="noselect inc-dec flex-container-Blany">
            <div onClick={() => incCounter()}>+</div>
            {counter !== undefined?
            <div>{changeEnc(counter.toString())}</div>
            :null}
            <div onClick={() => decCounter()}>-</div>
        </div>
    )
}

export default IncDec;
