/*jshint esversion: 8 */

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const carsSchema = new Schema({
  dealer_id: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  bodyType: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  }
});

module.exports = model('cars', carsSchema);
