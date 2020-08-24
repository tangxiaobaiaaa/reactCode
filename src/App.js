import React,{useState,useCallback,useEffect, Children} from 'react';
import './App.css'

import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal';

 

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
  
  const openCheckModal = useCallback(( id)=>{
    _setCurrenData(todoList,id)
      setShowCheckModal(true)
  },[todoList])


  const openEditModal = useCallback((id)=>{
  _setCurrenData(todoList,id)
    setShowEditModal(true)
 
     console.log('编辑点击了');
    
  },[todoList])

  function _setCurrenData(todoList,id){
    setCurrentData(()=>todoList.filter(item=>item.id === id)[0])
  }



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
      ></EditModal>
      <MyHeader openInput={()=>setInputShow(!isInputShow)} />
      <AddInput  isInputShow={isInputShow} addItem={addItem}/>
      <ul className='todo-list'>
        {
          todoList.map((item,index)=>{
            return(
              <TodoItem 
                data={item}
                key={index}
                openCheckModal = {openCheckModal}
                openEditModal = {openEditModal}
              />
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;                                                                                 
