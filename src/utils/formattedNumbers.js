export const formatNumbers = (count) => {
    if (count === undefined || count === null) {
        return 'N/A'
    }
    if (count >= 1000000) {
        return Math.floor(count / 1000000) + 'M';
    } else if (count >= 1000) {
        return Math.floor(count / 1000) + 'K';
    } else {
        return count.toString();
    }
};