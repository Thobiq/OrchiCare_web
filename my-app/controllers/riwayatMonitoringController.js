const DataMonitoring = require('../models/dataMonitoring');
const { Op, fn, col, where } = require('sequelize');

exports.getMonitoringData = async (req, res) => {
  const { from, to } = req.query;

  try {
    let data;
    if (from && to) {
      data = await DataMonitoring.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(from), new Date(to + 'T23:59:59')]
          }
        },
        order: [['createdAt', 'DESC']]
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      data = await DataMonitoring.findAll({
        where: where(fn('DATE', col('createdAt')), today),
        order: [['createdAt', 'DESC']]
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
};

exports.deleteMonitoringData = async (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: 'Rentang waktu tidak lengkap.' });
  }

  try {
    const deleted = await DataMonitoring.destroy({
      where: {
        createdAt: {
          [Op.between]: [new Date(from), new Date(to + 'T23:59:59')]
        }
      }
    });

    res.json({ message: `${deleted} data dihapus.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus data.' });
  }
};
