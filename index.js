const queryStringRegex = /([^&;]*?={0,1}[^&;]*)(?:[&;]{0,1})/g

function parseQueryStringFromUri (uri) {
  if (!uri.includes('?')) {
    throw new Error(`No query string found within "${uri}"`)
  }

  const queryString = decodeURIComponent(
    uri.substring(
      uri.indexOf('?') + 1
    )
  )

  return queryString
}

function parseQueryParameters (queryString) {
  const queryParameters = queryString.split(/[&;]/)

  return queryParameters
}

function createQueryParameterMap (queryParameters) {
  const queryParameterMap = {}

  queryParameters.forEach((queryParameter) => {
    const hasNoValue = !queryParameter.includes('=')
    const [key, value] = queryParameter.split('=')
    const keyExists = queryParameterMap[key] !== undefined
    const valueToInsert = hasNoValue ? null : value

    if (keyExists) {
      queryParameterMap[key] = [
        ...Array.from(
          Array.isArray(queryParameterMap[key])
            ? queryParameterMap[key]
            : [queryParameterMap[key]]
        ),
        valueToInsert
      ]
    } else {
      queryParameterMap[key] = valueToInsert
    }

  })

  return queryParameterMap
}

function parse (uri) {
  if (uri === undefined) {
    throw new Error('You must pass in a uri')
  }

  const queryString = parseQueryStringFromUri(uri)
  console.log(queryString)
  const queryParameters = parseQueryParameters(queryString)
  console.log(queryParameters)
  const queryParameterMap = createQueryParameterMap(queryParameters)

  return queryParameterMap
}

module.exports = parse