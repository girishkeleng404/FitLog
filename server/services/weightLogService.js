const { where, Op, fn, col } = require("sequelize");
const { WeightLog } = require("../models");

async function addWeghit(userId, data) {
  const currentDate = new Date();

  const weightLog = await WeightLog.create({
    weight: data.weight,
    date: currentDate,
    userId: userId,
    note: data.note || null,
  });

  return weightLog;
}

async function updateWeight(userId, body) {
  const { id, date, weight, note } = body;
  let weightLog;
  let lookupDate = date;

  if (!id && !date) {
    const now = new Date();
    lookupDate = now.toISOString().split("T")[0]; // yyyy-mm-dd
  }
  if (id) {
    weightLog = await WeightLog.findOne({
      where: {
        userId,
        userWeightId: id,
      },
    });
  } else {
    weightLog = await WeightLog.findOne({
      where: {
        userId,
        [Op.and]: [where(fn("DATE", col("date")), lookupDate)],
      },
    });
  }

  if (!weightLog) throw new Error("not_found");
  if (weightLog.userId !== userId) throw new Error("forbidden");

  return await weightLog.update({
    weight: weight ?? weightLog.weight,
    note: note ?? weightLog.note,
  });
}

async function getWeight(userId) {
  return await WeightLog.findAll({
    where: {
      userId,
    },
    order: [["date", "DESC"]],
    attributes: [["userWeightId", "id"], "date", "weight", "note"],
  });
}

module.exports = {
  addWeghit,
  updateWeight,
  getWeight,
};
