export const getBoxProductsArray = (order, current) => {
  return order.boxes[current].items.map( item => {
    const index = order.items.findIndex(x => x.id === item);
    return order.items[index];
  });
};

export const getTotalItems = (order) => {
  return order.items.reduce((total, item) => total + item.count, 0);
};