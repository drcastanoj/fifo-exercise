
## FIFO Problem

### Description

Sales Orders are orders created by a customer for us to provide a product
This is the demand.
'created': when the sales order was created
'quantity': how many items the customer wants

Purchase Orders are orders created by us to receive a product
This is the supply.
'receiving': when we expect to receive the product
'quantity': how many we will be receiving

We want to supply the products to the customers in the order in which
they were requested.

Implement the function 'allocate'.
The function should return an Array of elements. Each element should include
-> the ID of the sales order
-> the date the customer should expect to get the item

Additional
- we only send the product once we have enough for that sales order
- (so if the sales order is for 2, we need to have 2 available before sending)
- the function should support any number of sales orders or purchase orders
- to make it simple we only have one product

### NodeJS Version
this exercise has  done with node v10.15.3

```javascript
nvm install 10.15.3
nvm use 10.15.3
```

### Install 

```javascript
npm i
```

### Run exercise

```javascript
npm start
```

### Test

```javascript
npm test
```
