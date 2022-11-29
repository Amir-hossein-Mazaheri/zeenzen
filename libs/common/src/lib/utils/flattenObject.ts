import { ObjectKey } from '../types';

export function flattenObject(
  object: Record<ObjectKey, unknown>
): [ObjectKey[], unknown[]] {
  const flattenKeys: ObjectKey[] = [];
  const flattenValues: unknown[] = [];

  for (const [key, value] of Object.entries(object)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Set)
    ) {
      const [keys, values] = flattenObject(value as Record<ObjectKey, unknown>);

      flattenKeys.push(...keys);
      flattenValues.push(...values);

      continue;
    }

    flattenKeys.push(key);
    flattenValues.push(value);
  }

  return [flattenKeys, flattenValues];
}
