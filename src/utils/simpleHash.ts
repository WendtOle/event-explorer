export const simpleHash = (str: string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); // hash * 33 + c
  }
  return (hash >>> 0).toString(16); // unsigned 32-bit, hex string
};
