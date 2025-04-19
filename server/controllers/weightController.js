const WeightService = require("../services/weightLogService");
exports.addWeightLog = async (req, res) => {
  try {
    const weight = await WeightService.addWeghit(req.user.id, req.body);
    res.status(201).json({
      id: weight.userWeightId,
      weight: weight.weight,
      date: weight.date,
      note: weight.note,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateWeight = async (req, res) => {
  try {
    const updated = await WeightService.updateWeight(req.user.id, req.body);
    const date = updated.date.toISOString().split("T")[0];
    res.status(200).json({
      message: "updated Succesfully",
      updated: {
        id: updated.userWeightId,
        date: date,
        weight: updated.weight,
        note: updated.note,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getWeight = async (req, res) => {
  try {
    const getData = await WeightService.getWeight(req.user.id);

    res.status(200).json(getData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
