module.exports.getVisibility = () => {
    if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        return 'visibilitychange';
    }
    if (typeof document.msHidden !== 'undefined') {
        return 'msvisibilitychange';
    }
    if (typeof document.webkitHidden !== 'undefined') {
        return 'webkitvisibilitychange';
    }
};

module.exports.getHidden = () => {
    if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        return 'hidden';
    }
    if (typeof document.msHidden !== 'undefined') {
        return 'msHidden';
    }
    if (typeof document.webkitHidden !== 'undefined') {
        return 'webkitHidden';
    }
};
