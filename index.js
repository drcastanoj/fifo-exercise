const {salesOrders, purchaseOrders} = require('./data');


/**
 * Sort orders by attribute
 * @param  arr 
 * @param  attr 
 */
function sortOrders (arr, attr){
    return arr.sort((element1, element2) => new Date(element1[attr]) > new Date(element2[attr]));
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
    const sortPurchaseOrders = sortOrders(purchaseOrders, 'receiving')
    return sortOrders(salesOrders, 'created')
        .map(({ id, quantity, created }) => {
            let dateDelivery;
            stock = sortPurchaseOrders.reduce((accumulator, current, index)=> {
                if(index < purchaseOrdersIndex){
                    return accumulator;
                }
                
                if(quantity > accumulator && sortPurchaseOrders.length - 1 >= purchaseOrdersIndex){
                    purchaseOrdersIndex++;
                    dateDelivery = current.receiving;
                    return current.quantity  + accumulator;
                }
                return accumulator;
            }, stock);

            if (quantity <= stock) {

                stock = stock - quantity;
                return {
                    id,
                    delivery: new Date(created) < new Date(dateDelivery) ? dateDelivery : created
                };
            } else {
                return {
                    id,
                    delivery: undefined
                };

            }

        });

}



module.exports = allocate;