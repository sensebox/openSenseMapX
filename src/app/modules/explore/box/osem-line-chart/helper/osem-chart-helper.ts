const cache = {};

/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
export function id(): string {
  let newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);

  // append a 'a' because neo gets mad
  newId = `a${newId}`;

  // ensure not already used
  if(!cache[newId]) {
    cache[newId] = true;
    return newId;
  }

  return id();
}

export function sortLinear(data, property, direction = 'asc') {
    return data.sort((a, b) => {
      if (direction === 'asc') {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
  }
  
  export function sortByDomain(data, property, direction = 'asc', domain) {
    return data.sort((a, b) => {
      const aVal = a[property];
      const bVal = b[property];
  
      const aIdx = domain.indexOf(aVal);
      const bIdx = domain.indexOf(bVal);
  
      if (direction === 'asc') {
        return aIdx - bIdx;
      } else {
        return bIdx - aIdx;
      }
    });
  }
  
  export function sortByTime(data, property, direction = 'asc') {
    return data.sort((a, b) => {
      const aDate = a[property].getTime();
      const bDate = b[property].getTime();
  
      if (direction === 'asc') {
        if (aDate > bDate) return 1;
        if (bDate > aDate) return -1;
        return 0;
      } else {
        if (aDate > bDate) return -1;
        if (bDate > aDate) return 1;
        return 0;
      }
    });
  }
  