import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { connectToContext } from '../index.js';
import chai from 'chai';
const expect = chai.expect;

describe('Utils "connectToContext"', function () {
    context('with args ("primaryId")', function () {
        it('should be transfer context.primaryId to props.primaryId', function () {
            class Provider extends React.Component {
                static childContextTypes = {
                    primaryId: React.PropTypes.any
                };

                getChildContext() {
                    return {
                        primaryId: this.props.primaryId
                    }
                }

                render() {
                    return (
                        <div>
                            {this.props.children}
                        </div>
                    );
                }
            }

            class TestRaw extends React.Component {
                render() {
                    return (
                        <div>
                            {this.props.primaryId}
                        </div>
                    );
                }
            }

            const Test = connectToContext('primaryId')(TestRaw);

            const primaryId = 'test';

            expect(
                ReactDOMServer.renderToStaticMarkup(
                    <Provider primaryId = {primaryId}>
                        <Test/>
                    </Provider>
                )
            ).to.equal(
                ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <div>
                            {primaryId}
                        </div>
                    </div>
                )
            );
        });
    });

    context('with args (["primaryId", "testId"])', function () {
        it('should be transfer context.primaryId, context.testId to props.primaryId, props.testId', function () {
            class Provider extends React.Component {
                static childContextTypes = {
                    primaryId: React.PropTypes.any,
                    testId: React.PropTypes.any,
                };

                getChildContext() {
                    return {
                        primaryId: this.props.primaryId,
                        testId: this.props.testId,
                    }
                }

                render() {
                    return (
                        <div>
                            {this.props.children}
                        </div>
                    );
                }
            }

            class TestRaw extends React.Component {
                render() {
                    return (
                        <div>
                            {this.props.primaryId},{this.props.testId}
                        </div>
                    );
                }
            }

            const Test = connectToContext(['primaryId', 'testId'])(TestRaw);

            const primaryId = 'test1';
            const testId = 'test2';

            expect(
                ReactDOMServer.renderToStaticMarkup(
                    <Provider primaryId = {primaryId} testId = {testId}>
                        <Test/>
                    </Provider>
                )
            ).to.equal(
                ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <div>
                            {primaryId},{testId}
                        </div>
                    </div>
                )
            );
        });
    });

    context('with args ("primaryId", (context) => ({identityFieldName : "primaryId", experimentInputs  : {primaryId : context.primaryId}}))', function () {
        it('should be transfer context.primaryId to props.primaryId', function () {
            class Provider extends React.Component {
                static childContextTypes = {
                    primaryId: React.PropTypes.any,
                };

                getChildContext() {
                    return {
                        primaryId: this.props.primaryId,
                    }
                }

                render() {
                    return (
                        <div>
                            {this.props.children}
                        </div>
                    );
                }
            }

            class TestRaw extends React.Component {
                render() {
                    return (
                        <div>
                            {JSON.stringify(this.props)}
                        </div>
                    );
                }
            }

            const Test = connectToContext('primaryId', (context) => ({
                identityFieldName : 'primaryId',
                experimentInputs  : {primaryId : context.primaryId}
            }))(TestRaw);

            const primaryId = 'test';

            expect(
                ReactDOMServer.renderToStaticMarkup(
                    <Provider primaryId = {primaryId}>
                        <Test/>
                    </Provider>
                )
            ).to.equal(
                ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <div>
                            {JSON.stringify({
                                identityFieldName : 'primaryId',
                                experimentInputs  : {primaryId}
                            })}
                        </div>
                    </div>
                )
            );
        });
    });

    context('with properties = 10', function () {
        it('should be throw Error', function () {
            expect(
                () => connectToContext(10)
            ).to.throw(Error, 'Incorrect fields');
        });
    });

    context('with properties = [10]', function () {
        it('should be throw Error', function () {
            expect(
                () => connectToContext([10])
            ).to.throw(Error, 'Incorrect field');
        });
    });

    context('with properties = ["primaryId", 10]', function () {
        it('should be throw Error', function () {
            expect(
                () => connectToContext(['primaryId', 10])
            ).to.throw(Error, 'Incorrect field');
        });
    });
});