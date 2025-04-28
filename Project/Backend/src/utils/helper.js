exports.updateRollingAverageMultiClass = (oldAverage, newPrediction) => {
    return oldAverage.map((oldVal, idx) => 0.9 * oldVal + 0.1 * newPrediction[idx]);
};