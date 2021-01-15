
const allocate = require('./index');
const {salesOrders, purchaseOrders} = require('./data');


describe('allocate ', ()=> {
    
    test('undefined values', () => {
        expect(allocate(undefined, undefined)).toEqual([]);
    });
    
    
    test('Sales orders without purchase orders', () => {
        expect(allocate([], purchaseOrders)).toEqual([]);
    });
    
    test('without sales orders and purchase orders', () => {
        expect(allocate([], [])).toEqual([]);
    });
    
    test('Sales orders dispatched', () => {
        expect(allocate(salesOrders, purchaseOrders))
        .toEqual([
            { id: 'S3', delivery: '2020-01-04' },
            { id: 'S5', delivery: '2020-02-01' },
            { id: 'S1', delivery: '2020-02-20' },
            { id: 'S4', delivery: '2020-03-05' },
            { id: 'S2', delivery: undefined }
        ]);
    });

    test('Sales orders without purchase ', () => {
        expect(allocate(salesOrders, []))
        .toEqual([
            { id: 'S3', delivery: undefined },
            { id: 'S5', delivery: undefined },
            { id: 'S1', delivery: undefined },
            { id: 'S4', delivery: undefined },
            { id: 'S2', delivery: undefined }
        ]);
    });
    
});