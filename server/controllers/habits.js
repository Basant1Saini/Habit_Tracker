const Habit = require('../models/Habit');

// @desc    Get all habits for user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id })
      .populate('category', 'name color icon')
      .sort({ createdAt: -1 });

    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single habit
// @route   GET /api/habits/:id
// @access  Private
const getHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('category', 'name color icon');

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      user: req.user._id
    });

    const populatedHabit = await Habit.findById(habit._id)
      .populate('category', 'name color icon');

    res.status(201).json(populatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name color icon');

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ message: 'Habit removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark habit as complete
// @route   POST /api/habits/:id/complete
// @access  Private
const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const todayCompletion = habit.completions.find(
      completion => completion.date.toDateString() === today.toDateString()
    );

    if (todayCompletion) {
      return res.status(400).json({ message: 'Habit already completed today' });
    }

    // Add completion
    habit.completions.push({
      date: today,
      value: req.body.value || 1,
      notes: req.body.notes || ''
    });

    // Update streak
    habit.streak.current += 1;
    if (habit.streak.current > habit.streak.longest) {
      habit.streak.longest = habit.streak.current;
    }

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get habit statistics
// @route   GET /api/habits/:id/stats
// @access  Private
const getHabitStats = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const stats = {
      totalCompletions: habit.completions.length,
      currentStreak: habit.streak.current,
      longestStreak: habit.streak.longest,
      completionRate: 0,
      recentCompletions: habit.completions.slice(-30)
    };

    // Calculate completion rate for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentCompletions = habit.completions.filter(
      completion => completion.date >= thirtyDaysAgo
    );
    
    stats.completionRate = (recentCompletions.length / 30) * 100;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
};