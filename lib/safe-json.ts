export const safeStringify = (obj: any): string => {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object') {
      // Ignore DOM elements
      if (
        value instanceof HTMLElement ||
        (value.nodeType && typeof value.nodeName === 'string') ||
        (value.ownerDocument && value.ownerDocument.defaultView)
      ) {
        return undefined;
      }
      // Ignore SortableJS internal keys
      if (key.startsWith('Sortable')) {
        return undefined;
      }
      if (cache.has(value)) {
        return undefined; // skip circular references
      }
      cache.add(value);
    }
    return value;
  });
};
