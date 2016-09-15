# connect-to-context
React: Context -> Props

Example for requiredContextFields:
    1. "propertyName"
    2. ["propertyName1", "propertyName2", "propertyName3"]
*/

/*
    Example for mapContextToProps (optional):
    1. (context) => ({
        identityFieldName : 'primaryId',
        experimentInputs  : {primaryId : context.primaryId}
    })
    2. undefined