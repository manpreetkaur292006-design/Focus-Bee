import React from 'react'
import Timer from '../components/Timer'
import QuotesCard from '../components/QuotesCard'
import TaskList from '../components/TaskList'

const FocusPage = () => {
  return (
    <div className='focus-page'>
      <QuotesCard/>
      <Timer/>
      <TaskList/>
    </div>
  )
}

export default FocusPage