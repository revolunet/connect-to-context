'use strict';

var React = require('react');

module.exports.connectToContext = function connectToContext(requiredContextFields, mapContextToProps) {
    if (typeof requiredContextFields === 'string') {
        requiredContextFields = [requiredContextFields];
    }

    if (!Array.isArray(requiredContextFields)) {
        throw new Error('Incorrect fields ' + requiredContextFields);
    } else {
        for (var key in requiredContextFields) {
            if (typeof requiredContextFields[key] !== 'string') {
                throw new Error('Incorrect field ' + requiredContextFields[key]);
            }
        }
    }

    return function (Component) {
        function ConnectToContext(props, context) {
            var remapedContext = mapContextToProps ? mapContextToProps(context) : context;
            return React.createElement(Component, Object.assign({}, remapedContext, props));
        }

        ConnectToContext.contextTypes = {};
        for (var key in requiredContextFields) {
            ConnectToContext.contextTypes[requiredContextFields[key]] = React.PropTypes.any;
        }

        return ConnectToContext;
    };
};