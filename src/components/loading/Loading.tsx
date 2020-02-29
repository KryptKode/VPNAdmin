import React from 'react';
import ReactLoading from 'react-loading';



const Loading = ()=>{
    return (
        <div className='loading'>
            <ReactLoading type='cubes'  color='#1DA3B8' height={'20%'} width={'100%'}/>
        </div>
    );
};

export default Loading;