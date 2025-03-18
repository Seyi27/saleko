export const chunkArray = (data: any, size: number) => {
  let chunk = [];
  for (let i = 0; i < data.length; i += size) {
    chunk.push(data.slice(i, i + size));
  }
  return chunk;
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US");
};