export const getTimeSince = (targetDate) => {
    const units = ['y', 'm', 'w', 'd', 'h', 'm', 's'];
    const unitFactors = [31536000000, 2628000000, 604800000, 86400000, 3600000, 60000, 1000];

    const timeDifferenceMs = new Date() - new Date(targetDate);

    for (let i = 0; i < units.length; i++) {
        const unitDifference = Math.floor(timeDifferenceMs / unitFactors[i]);
        if (unitDifference >= 1) {
            return unitDifference === 1 ? `1${units[i]}` : `${unitDifference} ${units[i]} `;
        }
    }
    return 'Just now';
}