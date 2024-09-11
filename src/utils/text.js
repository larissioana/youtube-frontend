
export const formatText = (text) => {
    if (text === undefined || text === null) {
        return null
    }
    return text.split(/(?<=\.)\s|(\r?\n)/).filter(Boolean);
};

export const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
};