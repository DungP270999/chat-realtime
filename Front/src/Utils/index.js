import _ from "lodash";

import DateTime from "./DateTime/DateTime";

export function isEmpty(value) {

    if (_.isObject(value)) {
        if (Object.keys(value).length === 0) return true;
    }

    if (_.isArray(value)) {
        if (value.length === 0) return true;
    }

    if (value === "") {
        return true;
    }

    return (
        // _.isEmpty(value) ||
        _.isNull(value) ||
        _.isUndefined(value)
    )
}

export function deepCompareObj(x, y) {
    return JSON.stringify(x) === JSON.stringify(y)
}

export function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

export default {
    isEmpty,
    deepCompareObj,
    DateTime,
    isMobileDevice
}


