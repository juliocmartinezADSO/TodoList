import { useState } from 'react'
import './index.css'

function Editar ({handleSaveTask, taskEditing, handleChangeTask}) {
  return (
    <div className='todo-list'>
      <h1>Editing Task</h1>
      <form className='todo-form' onSubmit={handleSaveTask}>
        <input
          type='text'
          value={taskEditing}
          onChange={handleChangeTask}
          placeholder='Editing task'
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

function CreateTask({handleAddTask, taskInput, handleTaskInputChange, tasks, handleEditingTask, handleDeleteTask}){
  return (
    <div className='todo-list'>
      <h1>Todo List</h1>
      <form className='todo-form' onSubmit={handleAddTask}>
        <input
          type='text'
          value={taskInput}
          className='input'
          onChange={handleTaskInputChange}
          placeholder='Add a task'
        />
        <button type='submit'>Add</button>
      </form>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Task</th>
            <th scope='col'>Accion</th>
            <th scope='col'>State</th>
          </tr>
        </thead>
        {tasks.map((task, index) => (
          <tbody key={index}>
            <tr>
              <th scope='col'>{index}</th>
              <td>{task}</td>
              <td>
                <button
                  className='editar'
                  onClick={() => handleEditingTask(index)}
                >
                  Editar
                </button>
                <button
                  className='delete'
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}
export default function App () {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const [editing, setEditing] = useState(false)
  const [taskEditing, setTaskEditing] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  function handleTaskInputChange (e) {
    setTaskInput(e.target.value)
  }

  function handleAddTask (e) {
    e.preventDefault()
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput])
      setTaskInput('')
    }
  }

  function handleDeleteTask (index) {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  function handleEditingTask (index) {
    const updateTasks = [...tasks]
    if (updateTasks[index]) {
      setEditing(true)
      setTaskEditing(updateTasks[index])
      setEditingIndex(index)
    }
  }

  function handleChangeTask (e) {
    setTaskEditing(e.target.value)
  }

  function handleSaveTask (e) {
    e.preventDefault()
    const updatedTasks = [...tasks]
    updatedTasks[editingIndex] = taskEditing // No necesitas cambiar taskInput aquí

    setTasks(updatedTasks)
    setEditing(false)
    setTaskEditing('')
  }

  return editing ? (
    <Editar handleSaveTask={handleSaveTask} taskEditing={taskEditing} handleChangeTask={handleChangeTask} />
  ) : (
    <CreateTask handleEditingTask={handleEditingTask} handleDeleteTask={handleDeleteTask} handleAddTask={handleAddTask}  taskInput={taskInput} handleTaskInputChange={handleTaskInputChange} tasks={tasks}/>
  )
}
