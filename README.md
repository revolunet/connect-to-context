# connect-to-context
React: Context -> Props

## Example 
```javascript
const Test1 = connectToContext('primaryId')(TestRaw);

const Test2 = connectToContext(['primaryId', 'testId'])(TestRaw);

const Test3 = connectToContext('primaryId', (context) => ({
    identityFieldName : 'primaryId',
    experimentInputs  : {primaryId : context.primaryId}
}))(TestRaw);

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

ReactDOMServer.renderToStaticMarkup(
    <Provider primaryId = {primaryId} testId = {testId}>
        <Test1/>
        <Test2/>
        <Test3/>
    </Provider>
)
```

