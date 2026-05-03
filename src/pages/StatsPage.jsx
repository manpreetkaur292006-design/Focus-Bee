import React from 'react'
import Stats from '../components/Stats'
import FocusHeatmap from '../components/FocusHeatmap'

const StatsPage = () => {
  return (
    <div className='stats-page'>
      <Stats/>
      <FocusHeatmap/>
    </div>
  )
}

export default StatsPage