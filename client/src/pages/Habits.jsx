import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Plus, Edit, Trash2, CheckCircle } from 'lucide-react'

const Habits = () => {
  const [showModal, setShowModal] = useState(false)
  const queryClient = useQueryClient()

  const { data: habits, isLoading } = useQuery(
    'habits',
    () => axios.get('/api/habits').then(res => res.data)
  )

  const { data: categories } = useQuery(
    'categories',
    () => axios.get('/api/categories').then(res => res.data)
  )

  const completeHabitMutation = useMutation(
    (habitId) => axios.post(`/api/habits/${habitId}/complete`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('habits')
        queryClient.invalidateQueries('dashboard')
        toast.success('Habit completed!')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to complete habit')
      }
    }
  )

  const deleteHabitMutation = useMutation(
    (habitId) => axios.delete(`/api/habits/${habitId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('habits')
        toast.success('Habit deleted!')
      },
      onError: () => {
        toast.error('Failed to delete habit')
      }
    }
  )

  const handleCompleteHabit = (habitId) => {
    completeHabitMutation.mutate(habitId)
  }

  const handleDeleteHabit = (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabitMutation.mutate(habitId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Habits</h1>
          <p className="text-gray-600">Manage and track your daily habits</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Habit
        </button>
      </div>

      {habits && habits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <div key={habit._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: habit.category?.color || '#3B82F6' }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                    <p className="text-sm text-gray-500">{habit.category?.name}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteHabit(habit._id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {habit.description && (
                <p className="text-sm text-gray-600 mb-4">{habit.description}</p>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Frequency:</span> {habit.frequency}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Priority:</span> {habit.priority}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">Current Streak:</span>
                  <span className="ml-1 font-semibold text-orange-600">
                    {habit.streak?.current || 0} days
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Best:</span>
                  <span className="ml-1 font-semibold text-green-600">
                    {habit.streak?.longest || 0} days
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCompleteHabit(habit._id)}
                disabled={completeHabitMutation.isLoading}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Mark Complete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <CheckCircle className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No habits yet</h3>
          <p className="mt-2 text-gray-500">Get started by creating your first habit.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Habit
          </button>
        </div>
      )}
    </div>
  )
}

export default Habits