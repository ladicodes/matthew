const calculateTaxes = require('../utils/calculate');
const simulateScenario = require('../utils/simulation');

/**
 * Calculate taxes based on business inputs
 */
function calculate(inputs) {
  return calculateTaxes(inputs);
}

/**
 * Simulate investment scenarios over multiple years
 */
function simulate(base, years = 5) {
  return simulateScenario(base, years);
}

module.exports = {
  calculate,
  simulate
};