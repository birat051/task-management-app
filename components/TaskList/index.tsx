import withObservables from '@nozbe/with-observables'
import React from 'react'
import { TaskType } from '@/datamodels/Task'
import { UserType } from '@/datamodels/User'

function TaskList({users,tasks}:{users:UserType,tasks:TaskType}) {
  return (
    <div></div>
  )
}

const enhance = withObservables(['users'], ({ users }) => ({
    users,
    tasks: users.tasks
}))

const EnhancedTaskList=enhance(TaskList)

export default EnhancedTaskList