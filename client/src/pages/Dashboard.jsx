import { useQuery } from 'react-query'
import axios from 'axios'
import { CheckCircle, Target, Flame, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const { data: dashboard, isLoading } = useQuery(
    'dashboard',
    () => axios.get('/api/analytics/dashboard').then(res => res.data),
    { refetchInterval: 30000 }
  )

  const { data: habits } = useQuery(
    'habits',
    () => axios.get('/api/habits').then(res => res.data)
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = [
    {
      name: 'Total Habits',
      value: dashboard?.totalHabits || 0,
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      name: 'Completed Today',
      value: dashboard?.completedToday || 0,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Active Streaks',
      value: dashboard?.currentStreaks || 0,
      icon: Flame,
      color: 'bg-orange-500'
    },
    {
      name: 'Completion Rate',
      value: `${Math.round(dashboard?.averageCompletion || 0)}%`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your habit progress and stay motivated</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-md p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Habits */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Today's Habits</h2>
        </div>
        <div className="p-6">
          {habits && habits.length > 0 ? (
            <div className="space-y-4">
              {habits.slice(0, 5).map((habit) => (
                <div key={habit._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: habit.category?.color || '#3B82F6' }}
                    ></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{habit.name}</h3>
                      <p className="text-sm text-gray-500">{habit.category?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Streak: {habit.streak?.current || 0}
                    </span>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Target className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No habits yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first habit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard