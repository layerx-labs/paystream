/**
 * Deep merge the object into the target object; on merge conflicts accepts all incoming
 * @param {*} target
 * @param {*} obj
 * @returns The merged objects
 */
const merger = (
  target: Record<string | number, any>,
  obj: Record<string | number, any>
) => {
  if (!target) {
    target = Array.isArray(obj) ? [] : {};
  }
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      target[prop] =
        typeof obj[prop] === 'object' && typeof target[prop] === 'object'
          ? objectsMerger(target[prop], obj[prop])
          : obj[prop];
    }
  }
  return target;
};

export const objectsMerger = (...objects: Record<string | number, any>[]) =>
  objects.reduce((acc, cur) => merger(acc, cur));

export const preventNullValues = (data: Record<string, any>) =>
  Object.entries(data).reduce((result, [curKey, curValue]) => {
    if (curValue !== null) {
      result[curKey] = curValue;
    }
    return result;
  }, {} as Record<string, any>);
