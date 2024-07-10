create or replace view getting_verified_food_donations as
select food_id,d.institution_name	,f.Name	, photo	,Quantity,exp_Date,date_f from food f,donor d
where f.donor_id=d.donor_id 
and f.verified='Y' and d.verified='Y';