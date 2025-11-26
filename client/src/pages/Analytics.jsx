import { useQuery } from 'react-query'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const Analytics = () => {
  const { data: streaks, isLoading: streaksLoading } = useQuery(
    'streaks',
    () => axios.get('/api/analytics/streaks').then(res => res.data)
  )

  const { data: progress, isLoading: progressLoading } = useQuery(
    'progress',
    () => axios.get('/api/analytics/progress?period=30').then(res => res.data)
  )

  if (streaksLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Analyze your habit patterns and progress</p>
      </div>

      {/* Streaks Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Current Streaks</h2>
        {streaks && streaks.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={streaks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="habitName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="currentStreak" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No streak data available
          </div>
        )}
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">30-Day Progress</h2>
        {progress && progress.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="habitName" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="completionRate" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No progress data available
          </div>
        )}
      </div>

      {/* Habits Summary */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Habits Summary</h2>
        </div>
        <div className="p-6">
          {progress && progress.length > 0 ? (
            <div className="space-y-4">
              {progress.map((habit) => (
                <div key={habit.habitId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{habit.habitName}</h3>
                    <p className="text-sm text-gray-500">
                      {habit.completions} completions in last 30 days
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {Math.round(habit.completionRate)}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {habit.streak} day streak
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No habits to analyze yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics