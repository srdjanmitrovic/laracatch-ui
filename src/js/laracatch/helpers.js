/**
 * Decode frame and lines from string such as F43L12-14
 * @param  {String} input
 * @return {Array}
 */
export function decodeSelectedFrameAndLines(input) {
    const regexp = new RegExp(/F(\d+)(L((\d+)-(\d+)|(\d+)))?/g);

    return regexp.exec(input);
}

/**
 * Determine if a frame is an unknown frame.
 * @param  {Frame}  frame
 * @return {Boolean}
 */
export function isUnknownFrame(frame) {
    return frame.relative_file === 'unknown';
}

/**
 * Determine if a frame is a vendor frame.
 * @param  {Frame}  frame
 * @return {Boolean}
 */
export function isVendorFrame(frame) {
    return frame.relative_file.startsWith('/vendor/');
}

/**
 * Get the type of the frame.
 * @param  {Frame} frame
 * @return {String}
 */
export function getFrameType(frame) {
    if (isVendorFrame(frame)) {
        return 'vendor';
    }

    if (isUnknownFrame(frame)) {
        return 'unknown';
    }

    return 'application';
}
