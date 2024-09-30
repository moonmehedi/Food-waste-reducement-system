CREATE OR REPLACE VIEW Customer_Order_History AS
SELECT 
    o.ORDER_ID as "Order No",
    o.NID,
    o.QUANTITY AS "Order Quantity",
    o.ORDER_STATUS AS "Order Status",
    o.ORDER_DATE AS "Order Date",
    o.DONOR_NAME AS "Seller Name",
    f.NAME AS "Food Name",
    f.QUANTITY AS "Food Quantity"
FROM ORDERS o, FOOD f
WHERE o.FOOD_ID = f.FOOD_ID;
