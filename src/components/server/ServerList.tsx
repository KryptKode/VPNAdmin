import React from 'react';
import ServerComp from './Server';
import Server from '../../interfaces/Server';

interface ServerListProps{
    items:Server[],
}

const ServerList = ({items}:ServerListProps)=>{
    console.log("Items", items)
    return (
        <div className='servers-list'>
            
            {
                items.map((item)=>{
                   return <ServerComp key={item.id} item={item}/>
                })
            }
        </div>
    );
};

export default ServerList;