CREATE OR REPLACE VIEW DonationHistoryView AS
SELECT 
    f.food_id, 
    f.donor_id, 
    f.name AS "Food Name", 
    f.photo, 
    f.quantity, 
    f.sell_or_donate, 
    f.verified AS "Verified Food",
    rec.recipient_id,
    rec.req_date AS "Donation Date",  -- Use req_date as per your requirement
    r.institution_name, 
    r.institution_type, 
    r.city, 
    r.district, 
    r.division, 
    r.streetno, 
    r.verified AS "recipient verified"
FROM FOOD f, RECEIVES rec, RECIPIENT r
WHERE 
    f.food_id = rec.food_id 
    AND rec.recipient_id = r.recipient_id; 

