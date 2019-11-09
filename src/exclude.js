import { isEmpty } from './utilities'

function exclude (config = {}, req) {
  const { exclude = {}, debug } = config

  if ((typeof exclude.filter === 'function') && exclude.filter(req)) {
    debug(`Excluding request by filter ${req.url}`)

    return true
  }

  // do not cache request with query
  const hasQueryParams = req.url.match(/\?.*$/) ||
    !isEmpty(req.params) ||
    (typeof URLSearchParams !== 'undefined' && req.params instanceof URLSearchParams)

  if (exclude.query && hasQueryParams) {
    debug(`Excluding request by query ${req.url}`)

    return true
  }

  const paths = exclude.paths || []
  const found = paths.find(regexp => req.url.match(regexp))

  if (found) {
    debug(`Excluding request by url match ${req.url}`)

    return true
  }

  return false
}

export default exclude
