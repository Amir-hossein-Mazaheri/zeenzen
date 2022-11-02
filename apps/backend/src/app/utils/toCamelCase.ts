import * as _ from 'lodash';

export function toCamelCase<T extends object>(snake_case_object: T) {
  return _.mapKeys<T>(snake_case_object, (value, key) => _.camelCase(key));
}
