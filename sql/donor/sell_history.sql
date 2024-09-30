CREATE OR REPLACE VIEW SellHistoryView AS
SELECT 
    f.food_id, 
    f.donor_id, 
    f.name AS "Food Name", 
    f.photo, 
    f.quantity, 
    f.sell_or_donate,
    o.order_status,
    o.order_date,
    o.donor_name,
    c.name,
    c.city,
    c.district,
    c.division,
    c.streetno

FROM FOOD f, ORDERS o, CUSTOMER c
WHERE 
    f.food_id = o.food_id
AND
    o.nid = c.nid;

