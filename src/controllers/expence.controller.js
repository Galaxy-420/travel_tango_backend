const Expense = require("../models/Expense");
const Trip = require("../models/Trip");

// Create new Expense
exports.createExpense = async (req, res) => {
  try {
    const { tripId, title, amount, date, category, description } = req.body;

    // Check if Trip exists and belongs to user
    const trip = await Trip.findOne({ where: { id: tripId, UserId: req.user.id } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found or unauthorized" });
    }

    const expense = await Expense.create({
      title,
      amount,
      date,
      category,
      description,
      TripId: tripId,
      UserId: req.user.id,
    });

    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error: error.message });
  }
};

// Get all Expenses of logged-in user
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { UserId: req.user.id } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// Get Expenses for a specific Trip
exports.getTripExpenses = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ where: { id: tripId, UserId: req.user.id } });
    if (!trip) {
      return res.status(404).json({ message: "Trip not found or unauthorized" });
    }

    const expenses = await Expense.findAll({ where: { TripId: tripId } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip expenses", error });
  }
};

// Get single Expense
exports.getExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ where: { id, UserId: req.user.id } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error: error.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date, category, description } = req.body;

    const expense = await Expense.findOne({ where: { id, UserId: req.user.id } });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (title !== undefined) expense.title = title;
    if (amount !== undefined) expense.amount = amount;
    if (date !== undefined) expense.date = date;
    if (category !== undefined) expense.category = category;
    if (description !== undefined) expense.description = description;

    await expense.save();

    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({ where: { id, UserId: req.user.id } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
};
