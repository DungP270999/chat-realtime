module.exports = {
    extends: [
        'react-app',
        'airbnb',
        'prettier',
        'prettier/react',
    ],
    plugins: [
        'jsx-a11y',
        'prettier',
    ],
    rules: {
        'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
        'react/jsx-props-no-spreading': ['off'],
        'react/state-in-constructor': ['off'],
        'react/static-property-placement': ['off'],
        'react/no-array-index-key': ['off'],
        "no-use-before-define": ["error", {"functions": false, "classes": false, "variables": false}],
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
        "no-underscore-dangle": [0],
        "no-lonely-if": [0],
        "no-param-reassign": [0],
        "no-plusplus": [0],
        "prefer-template": [0],
        "prefer-const": [1],
        "object-shorthand": [0],
        "react-hooks/exhaustive-deps": [0],
        "react/forbid-prop-types": [0],
        "react/destructuring-assignment": [0],
        semi: 1
    },
};
