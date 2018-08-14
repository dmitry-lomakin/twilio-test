'use strict';

export default class Component {
    constructor({ element }) {
        this._element = element;
    }

    on(eventName, selector, callback) {
        if (!callback) {
            callback = selector
            this._element.addEventListener(eventName, callback);

            return;
        }

        this._element.addEventListener(eventName, (event) => {
            let delegateTarget = event.target.closest(selector);

            if (!delegateTarget) {
                return;
            }

            event.delegateTarget = delegateTarget;

            callback(event);
        });
    }
}