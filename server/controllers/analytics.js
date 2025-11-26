const Habit = require('../models/Habit');

// @desc    Get dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isActive: true });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dashboard = {
      totalHabits: habits.length,
      completedToday: 0,
      currentStreaks: 0,
      averageCompletion: 0
    };

    habits.forEach(habit => {
      // Check if completed today
      const todayCompletion = habit.completions.find(
        completion => completion.date.toDateString() === today.toDateString()
      );
      if (todayCompletion) dashboard.completedToday++;

      // Count active streaks
      if (habit.streak.current > 0) dashboard.currentStreaks++;
    });

    // Calculate average completion rate
    if (habits.length > 0) {
      const totalCompletions = habits.reduce((sum, habit) => sum + habit.completions.length, 0);
      const totalDays = habits.reduce((sum, habit) => {
        const daysSinceCreated = Math.ceil((today - habit.createdAt) / (1000 * 60 * 60 * 24));
        return sum + daysSinceCreated;
      }, 0);
      dashboard.averageCompletion = totalDays > 0 ? (totalCompletions / totalDays) * 100 : 0;
    }

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get streak information
// @route   GET /api/analytics/streaks
// @access  Private
const getStreaks = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isActive: true })
      .populate('category', 'name color')
      .select('name streak category');

    const streaks = habits.map(habit => ({
      habitId: habit._id,
      habitName: habit.name,
      category: habit.category,
      currentStreak: habit.streak.current,
      longestStreak: habit.streak.longest
    }));

    res.json(streaks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress reports
// @route   GET /api/analytics/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const habits = await Habit.find({ user: req.user._id, isActive: true });

    const progress = habits.map(habit => {
      const recentCompletions = habit.completions.filter(
        completion => completion.date >= startDate
      );

      return {
        habitId: habit._id,
        habitName: habit.name,
        completions: recentCompletions.length,
        completionRate: (recentCompletions.length / days) * 100,
        streak: habit.streak.current
      };
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export habit data
// @route   POST /api/analytics/export
// @access  Private
const exportData = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id })
      .populate('category', 'name');

    const exportData = habits.map(habit => ({
      name: habit.name,
      category: habit.category.name,
      frequency: habit.frequency,
      priority: habit.priority,
      currentStreak: habit.streak.current,
      longestStreak: habit.streak.longest,
      totalCompletions: habit.completions.length,
      createdAt: habit.createdAt,
      completions: habit.completions
    }));

    res.json({
      message: 'Data exported successfully',
      data: exportData,
      exportedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboard,
  getStreaks,
  getProgress,
  exportData,
};