const { salesOrders, purchaseOrders } = require("./data");

/**
 * Sort orders by attribute
 * @param  arr
 * @param  attr
 */
function sortOrders(arr, attr) {
  return arr.sort(
    (element1, element2) => new Date(element1[attr]) > new Date(element2[attr])
  );
}


/**
 * get new stock from purchase orders 
 * 
 * @param {*} purchaseOrders 
 * @param {*} stock                 init value stock
 * @param {*} quantity              sales quantity 
 * @param {*} purchaseOrdersIndex   index purchase orders done 
 */
function getStock(purchaseOrders, stock, quantity, purchaseOrdersIndex) {
  return purchaseOrders.reduce(
    (accumulator, current, index) => {
      if (index < purchaseOrdersIndex) {
        return accumulator;
      }

      if (
        quantity > accumulator.stock &&
        purchaseOrders.length - 1 >= accumulator.purchaseOrdersIndex
      ) {
        return {
          stock: current.quantity + accumulator.stock,
          purchaseOrdersIndex: ++accumulator.purchaseOrdersIndex,
          delivery: current.receiving,
        };
      }
      return accumulator;
    },
    { stock, purchaseOrdersIndex }
  );
}

/**
 *
 * @param  salesOrders
 * @param  purchaseOrders
 *
 * @return  orders
 */
function allocate(salesOrders, purchaseOrders) {
  if (!salesOrders || !purchaseOrders) {
    return [];
  }

  let stock = 0;
  let purchaseOrdersIndex = 0;
  const sortPurchaseOrders = sortOrders(purchaseOrders, "receiving");
  return sortOrders(salesOrders, "created").map(({ id, quantity, created }) => {
    const newStock = getStock(
      sortPurchaseOrders,
      stock,
      quantity,
      purchaseOrdersIndex
    );
    stock = newStock.stock;
    purchaseOrdersIndex = newStock.purchaseOrdersIndex;

    if (quantity <= stock) {
      stock = stock - quantity;
      const { delivery } = newStock;
      return {
        id,
        delivery: new Date(created) < new Date(delivery) ? delivery : created,
      };
    } else {
      return {
        id,
        delivery: undefined,
      };
    }
  });
}
console.log(allocate(salesOrders, purchaseOrders));
module.exports = allocate;
