import React,{useState,useCallback,useEffect, Children} from 'react';
import './App.css'

import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal';
import NoDataTip from './components/NoDataTip'
 

function App() {

  const [isInputShow,setInputShow] = useState(false),
        [isShowCheckModal,setShowCheckModal] = useState(false),
        [isShowEditModal,setShowEditModal] = useState(false),
        [todoList,setTodoList] = useState([]),
        [currentData,setCurrentData] = useState({})


  useEffect(()=>{
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]' ) 
    setTodoList(todoData)
  },[])

  useEffect(()=>{
    localStorage.setItem('todoData',JSON.stringify(todoList))
  },[todoList])


  const addItem = useCallback((value)=>{
    const dataItem = {
      id: new Date().getTime(),
      content:value,
      completed:false
      
    }
     setTodoList((todoList)=>[...todoList,dataItem])
     setInputShow(false)
  },[])
 

  const completeItem = useCallback((id)=>{
    console.log('点击了个寂寞');
    setTodoList((todoList)=> todoList.map( item =>{
      console.log(item.id,'外面');
        if(item.id === id){
            item.completed = !item.completed 
               console.log(item.id,'里面');
        }
        return item
      }))
  },[])

  const removeItem = useCallback((id)=>{
    setTodoList((todoList)=>todoList.filter(item =>item.id !== id))
  },[])

  const openCheckModal = useCallback(( id)=>{
    _setCurrenData(todoList,id)
      setShowCheckModal(true)
  },[todoList])


  const openEditModal = useCallback((id)=>{
  _setCurrenData(todoList,id)
    setShowEditModal(true)
  },[todoList])


  function _setCurrenData(todoList,id){
    setCurrentData(()=>todoList.filter(item=>item.id === id)[0])
  }

  const submitEdit = useCallback((newData,id)=>{
    setTodoList((todoList)=>
      todoList.map((item)=>{
        if(item.id === id){
          item = newData
        }
        return item
      })
    )
    setShowEditModal(false)
  },[])
 
  return (
    <div className="App">
      <CheckModal
        isShowCheckModal = {isShowCheckModal}
        data = {currentData}
        closeModal = {()=>setShowCheckModal(false)}
      ></CheckModal>
      <EditModal
        isShowEditModal = {isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      ></EditModal>
      <MyHeader openInput={()=>setInputShow(!isInputShow)} />
      <AddInput  isInputShow={isInputShow} addItem={addItem}/>
      {
        !todoList || todoList.length === 0 
        ?
        (<NoDataTip></NoDataTip>)
        :
        (
              <ul className='todo-list'>
        {
          todoList.map((item,index)=>{
            return(
              <TodoItem 
                data={item}
                key={index}
                openCheckModal = {openCheckModal}
                openEditModal = {openEditModal}
                completeItem = {completeItem}
                removeItem={removeItem}
              />
            )
          })
        }
      </ul>
        )
      }
  
    </div>
  );
}

export default App;                                                                                 
