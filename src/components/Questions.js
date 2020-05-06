import React from 'react';
import Radio from './Radio.js';
import OpenQuestion from './OpenQuestion';
import Answerer from './Answerer';

function Questions() {
    return(
        <div>
            <br/><br/><br/>
            <Answerer/>
            <br/><br/><br/>
            <Radio />
             <br/><br/><br/>
            <OpenQuestion />
        </div>
    )
}

export default Questions;