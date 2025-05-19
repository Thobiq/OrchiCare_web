class SensorService {
  constructor() {
    this.temperatureBuffer = [];
    this.humidityBuffer = [];
    this.soilMoistureBuffer = [];
    this.lastSavedTime = Date.now();
  }

  average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  async handleData(data) {
    const { temperature, humidity, soilMoisture } = data;
    this.temperatureBuffer.push(temperature);
    this.humidityBuffer.push(humidity);
    this.soilMoistureBuffer.push(soilMoisture);

    if (Date.now() - this.lastSavedTime >= 10 * 60 * 1000) {
      const avgTemp = this.average(this.temperatureBuffer);
      const avgHumidity = this.average(this.humidityBuffer);
      const avgSoil = this.average(this.soilMoistureBuffer);

      await Sensor.create({ temperature: avgTemp, humidity: avgHumidity, soilMoisture: avgSoil });

      this.temperatureBuffer = [];
      this.humidityBuffer = [];
      this.soilMoistureBuffer = [];
      this.lastSavedTime = Date.now();

      console.log(`💾 Saved: Temp=${avgTemp}, Hum=${avgHumidity}, Soil=${avgSoil}`);
    }
  }
}

module.exports = new SensorService();
