// CUSTOM LIB REQUIRE
// CURRIFY
function listTypeCurrify(fn) {
    return [
        /*eslint no-unused-vars: 0*/
        function (a) {
            return fn.apply(void 0, arguments);
        }, function (a, b) {
            return fn.apply(void 0, arguments);
        }, function (a, b, c) {
            return fn.apply(void 0, arguments);
        }, function (a, b, c, d) {
            return fn.apply(void 0, arguments);
        }, function (a, b, c, d, e) {
            return fn.apply(void 0, arguments);
        }];
};

function check(fn) {
    if (typeof fn !== 'function') throw Error('fn should be function!');
}

function currify(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }
    check(fn);
    if (args.length >= fn.length) return fn.apply(void 0, args);
    var again = function again() {
        for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args2[_key2] = arguments[_key2];
        }

        return currify.apply(void 0, [fn].concat([].concat(args, args2)));
    };

    var count = fn.length - args.length - 1;
    var func = listTypeCurrify(again)[count];
    return func || again;
};

//FULLSTORE
function store(value) {
    const data = {
        value,
    };

    return (...args) => {
        const [value] = args;

        if (!args.length)
            return data.value;

        data.value = value;

        return value;
    };
};
//CREATEELEMENT
const queryElementCreate = (a) => document.querySelector(`[data-name="${a}"]`);
const setAttribute = currify((el, obj, name) => el.setAttribute(name, obj[name]));
const set = currify((el, obj, name) => el[name] = obj[name]);
const not = currify((f, a) => !f(a));
const isCamelCase = (a) => a !== a.toLowerCase();

function isElementPresent(dataName) {
    if (!dataName)
        return;

    return queryElementCreate(dataName);
}

function createElement(name, options = {}) {
    const {
        dataName,
        notAppend,
        parent = document.body,
        uniq = true,
        ...restOptions
    } = options;

    const elFound = isElementPresent(dataName);

    if (uniq && elFound)
        return elFound;

    const el = document.createElement(name);

    if (dataName)
        el.dataset.name = dataName;

    Object.keys(restOptions)
        .filter(isCamelCase)
        .map(set(el, options));

    Object.keys(restOptions)
        .filter(not(isCamelCase))
        .map(setAttribute(el, options));

    if (!notAppend)
        parent.appendChild(el);

    return el;
};


// MAIN SMALLTALK

const BUTTON_OK = {
    ok: 'OK',
};
const BUTTON_OK_CANCEL = {
    ok: 'OK',
    cancel: 'Cancel',
};

const keyDown = currify(keyDown_);

const zIndex = store(1060);

export const alert = (title, msg, options) => {
    const buttons = getButtons(options) || BUTTON_OK;
    return showDialog(title, msg, '', buttons, options);
};

/**
 * options:{inputLabel,className,toggle,buttons}
 * buttons:{label,className,onclick}
 */
export const prompt = (title, msg, value = '', options) => {
    const type = getType(options);
    const val = String(value)
        .replace(/"/g, '&quot;');

    const valueStr = `<label>${options.inputLabel || ""}</label> 
    <input type="${type}" value="${val}" data-name="js-input">`;
    const buttons = getButtons(options) || BUTTON_OK_CANCEL;

    return showDialog(title, msg, valueStr, buttons, options);
};

/**
 * options:{className,toggle,buttons}
 * buttons:{label,className,onclick}
 */
export const confirm = (title, msg, options) => {
    const buttons = getButtons(options) || BUTTON_OK_CANCEL;

    return showDialog(title, msg, '', buttons, options);
};

/**
 * options:{className,toggle,buttons}
 * buttons:{label,className,onclick}
 */
export const progress = (title, message, options) => {
    const valueStr = `
        <progress value="0" data-name="js-progress" class="progress" max="100"></progress>
        <span data-name="js-counter">0%</span>
    `;

    const buttons = {
        cancel: 'Abort',
    };

    const promise = showDialog(title, message, valueStr, buttons, options);
    const {ok, dialog} = promise;
    const resolve = ok();

    find(dialog, ['cancel']).map((el) => {
        el.focus();
        return null;
    });

    Object.assign(promise, {
        setProgress(count) {
            const [elProgress] = find(dialog, ['progress']);
            const [elCounter] = find(dialog, ['counter']);

            elProgress.value = count;
            elCounter.textContent = `${count}%`;

            if (count === 100) {
                remove();
                resolve();
            }
        },

        remove() {
            remove();
        },
    });

    return promise;
};

function getButtons(options = {}) {
    const {buttons} = options;

    if (!buttons)
        return null;

    return buttons;
}

function getType(options = {}) {
    const {type} = options;
    if (type === undefined)
        return 'text';
    return type;
}

function getTemplate(title, msg, value, buttons, options) {
    const encodedMsg = msg.replace(/\n/g, '<br>');
    const classElementSmalltalk = `${options && options.className ? options.className : ''} ${options && options.animation ? options.animation : 'slide-in-top'}`;
    return `<div class="smalltalk ${classElementSmalltalk}" id="smalltalk"  style="z-index: ${zIndex(zIndex() + 1) + 1}">
        <div class="page">
            <div data-name="js-close" class="close-button">x</div>
            <header class="smalltalk__header">${title}</header>
            <div class="content-area">${encodedMsg}${value}</div>
            <div class="action-area">
                <div class="button-strip">
                    ${parseButtons(buttons)}
                </div>
            </div>
        </div>
    </div>`;
}

function parseButtons(buttons) {
    const names = Object.keys(buttons);
    const parse = currify((buttons, buttonId, i) => {
        return `<button 
                    id="smalltalk__button-${buttonId}"
                    tabindex=${i} 
                    class="${buttons[buttonId].className || buttonId === "ok" ? "btn-success btn" : undefined || "btn-default btn"} "
                    data-name="js-${buttonId.toLowerCase()}"
                    onclick=""
                >
                    ${buttons[buttonId].label || buttons[buttonId]}
                </button>`
    });

    return names
        .map(parse(buttons))
        .join('');
}

function showDialog(title, msg, value, buttons, options) {
    const ok = store();
    const cancel = store();

    const closeButtons = [
        'cancel',
        'close',
        'ok',
    ];

    const promise = new Promise((resolve, reject) => {
        const noCancel = options && options.cancel === false;
        const empty = () => {
        };
        const rejectError = () => reject(Error());
        ok(resolve);
        cancel(noCancel ? empty : rejectError);
    });

    const innerHTML = getTemplate(title, msg, value, buttons, options);

    const dialog =
        createElement('div', {
            innerHTML,
            className: 'smalltalk-background',
            id: `smalltalk-content`,
            style: `z-index: ${zIndex(zIndex())}`,
        })

    // eslint-disable-next-line
    for (const el of find(dialog, ['ok', 'input'])) {
        el.focus();
    }

    // eslint-disable-next-line
    for (const el of find(dialog, ['input'])) {
        el.setSelectionRange(0, value.length);
    }

    if (options && options.toggle === true) {
        document.getElementById(`smalltalk-content`).addEventListener('click', (e) => {
            if (e.target.id === `smalltalk-${zIndex(zIndex())}`) remove()
        });
    }

    addListenerAll('click', dialog, closeButtons, (event) => {
        closeDialog(event.target, dialog, ok(), cancel());
    });

    // add hand onclick cho cac button them vao
    if (options && options.buttons) {
        // eslint-disable-next-line
        for (const key in options.buttons) {
            if (options.buttons[key].onclick !== undefined) { // check co function onclick
                addListenerAll('click', dialog, [key], () => {
                    options.buttons[key].onclick();
                });
            }
        }
    }

    // eslint-disable-next-line
    for (const event of ['click', 'contextmenu'])
        dialog.addEventListener(event, (e) => {
            e.stopPropagation();
            // eslint-disable-next-line
            for (const el of find(dialog, ['ok', 'input'])) {
                el.focus();
            }
        });

    dialog.addEventListener('keydown', keyDown(dialog, ok(), cancel()));
    return Object.assign(promise, {
        dialog,
        ok,
    });
}

function keyDown_(dialog, ok, cancel, event) {
    const KEY = {
        ENTER: 13,
        ESC: 27,
        TAB: 9,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
    };

    const {keyCode} = event;
    const el = event.target;

    const namesAll = ['ok', 'cancel', 'input'];
    const names = find(dialog, namesAll)
        .map(getDataName);

    switch (keyCode) {
        case KEY.ENTER:
            closeDialog(el, dialog, ok, cancel);
            event.preventDefault();
            break;

        case KEY.ESC:
            remove();
            cancel();
            break;

        case KEY.TAB:
            if (event.shiftKey)
                tab(dialog, names);

            tab(dialog, names);
            event.preventDefault();
            break;

        default:
            ['left', 'right', 'up', 'down'].filter((name) => {
                return keyCode === KEY[name.toUpperCase()];
            }).forEach(() => {
                changeButtonFocus(dialog, names);
            });

            break;
    }

    event.stopPropagation();
}

function getDataName(el) {
    return el
        .getAttribute('data-name')
        .replace('js-', '');
}

const getName = (activeName) => {
    if (activeName === 'cancel')
        return 'ok';

    return 'cancel';
};

function changeButtonFocus(dialog, names) {
    const active = document.activeElement;
    const activeName = getDataName(active);
    const isButton = /ok|cancel/.test(activeName);
    const count = names.length - 1;

    if (activeName === 'input' || !count || !isButton)
        return;

    const name = getName(activeName);

    // eslint-disable-next-line
    for (const el of find(dialog, [name])) {
        el.focus();
    }
}

const getIndex = (count, index) => {
    if (index === count)
        return 0;

    return index + 1;
};

function tab(dialog, names) {
    const active = document.activeElement;
    const activeName = getDataName(active);
    const count = names.length - 1;

    const activeIndex = names.indexOf(activeName);
    const index = getIndex(count, activeIndex);

    const name = names[index];

    // eslint-disable-next-line
    for (const el of find(dialog, [name]))
        el.focus();
}

function closeDialog(el, dialog, ok, cancel) {
    const name = el
        .getAttribute('data-name')
        .replace('js-', '');

    if (/close|cancel/.test(name)) {
        cancel();
        remove();
        return;
    }

    const value = find(dialog, ['input'])
        .reduce((value, el) => el.value, null);

    ok(value);
    remove();
}

const query = currify((element, name) => element.querySelector(`[data-name="js-${name}"]`));

function find(element, names) {
    const elements = names
        .map(query(element))
        .filter(Boolean);

    return elements;
}

function addListenerAll(event, parent, elements, fn) {
    if (elements) {
        // eslint-disable-next-line
        for (const el of find(parent, elements)) {
            el.addEventListener(event, fn);
        }
    } else {
        parent.addEventListener(event, fn);
    }

}

function remove() {
    let element = document.getElementById("smalltalk-content");
    element.className += " background-fade-out";
    setTimeout(
        () => {
            try {
                document.getElementById(`smalltalk-content`).remove()
            } catch {
                return
            }
        }
        , 300
    )
}
