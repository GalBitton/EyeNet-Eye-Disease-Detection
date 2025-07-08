export const generateRecommendations = (prediction) => {
    switch (prediction) {
        case 'Healthy': return ['Your eye appears healthy.', 'Continue regular check-ups.', 'Maintain good hygiene.'];
        case 'Cataract': return ['Signs of cataract detected.', 'Consult an ophthalmologist.', 'Protect your eyes from sunlight.'];
        case 'Stye': return ['Possible stye detected.', 'Apply warm compresses.', 'Seek medical attention if needed.'];
        case 'Conjunctivitis': return ['Symptoms of conjunctivitis detected.', 'Use prescribed drops.', 'Maintain hygiene.'];
        default: return ['Unable to determine a clear diagnosis.'];
    }
};