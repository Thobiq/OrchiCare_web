const { NilaiBatasan } = require('../models');

exports.saveLimits = async (limits) => {
  await NilaiBatasan.update({
    max_suhu_greenhouse: limits.suhu.max,
    min_suhu_greenhouse: limits.suhu.min,
    max_kelembaban_greenhouse: limits.kelembapan.max,
    min_kelembaban_greenhouse: limits.kelembapan.min,
    max_kelembaban_tanaman: limits.kelembapanTanaman.max,
    min_kelembaban_tanaman: limits.kelembapanTanaman.min,
  }, {
    where: { id_nilai_batasan: 1 }
  });
};