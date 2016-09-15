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

ReactDOMServer.renderToStaticMarkup(
    <Provider primaryId = {primaryId} testId = {testId}>
        <div>
            <Test1/>
            <Test2/>
            <Test3/>
        </div>
    </Provider>
)
```

