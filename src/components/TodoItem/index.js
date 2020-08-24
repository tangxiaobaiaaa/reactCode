import React from 'react';


import './index.scss'


function TodoItem(props){

    const {data,openCheckModal,openEditModal} =  props
    return(
        <li className='todo-item'>
            <div className='check-box'> 
                <input   type='checkbox' checked={data.completed}    />
                <span className='content' style={{"textDecoration":data.completed?'line-through':'none'}} >
                    {data.content}
                </span>
             
            </div>
               <div className='btn-group'>
                    <button className='btn btn-primary' onClick={() => openCheckModal(data.id)}>查看</button>
                    <button className='btn btn-waring'  onClick={() => openEditModal(data.id)}>编辑</button>
                    <button className='btn btn-danger'>删除</button>
                </div>
        </li>
    )
}

export default TodoItem