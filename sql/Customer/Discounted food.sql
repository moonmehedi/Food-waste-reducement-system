CREATE OR REPLACE VIEW Discounted_Food AS
SELECT 
    s.food_id AS "FOOD ID",
    f.NAME AS "Food Name",
    f.QUANTITY AS "Quantity",
    f.EXP_DATE AS "Expiration Date",
    f.PHOTO AS "Food Image",
    s.ORIGINAL_PRICE AS "Original Price",
    s.DISCOUNTED_PRICE AS "Discounted Price",
    d.INSTITUTION_NAME AS "Seller Name"
FROM
    FOOD f,DONOR d, SELLS s
WHERE 
    s.food_id = f.food_id
AND
    f.donor_id = d.donor_id
AND
    s.NID IS NULL
AND
    f.SELL_OR_DONATE = 'SELL'
AND
    f.EXP_DATE > f.DATE_F;



CREATE OR REPLACE VIEW Cart_View AS
SELECT 
    s.NID AS "Customer ID",
    s.FOOD_ID AS "Food ID",
    s.DONOR_ID AS "Seller Name"
    f.NAME AS "Food Name",
    f.PHOTO AS "Food Image",
    s.ORIGINAL_PRICE AS "Original Price",
    s.DISCOUNTED_PRICE AS "Discounted Price",
    (s.ORIGINAL_PRICE - s.DISCOUNTED_PRICE) AS "Discount Amount", -- Virtual column
    s.DATE_S AS "Date of Sale"
FROM 
    SELLS s
JOIN 
    FOOD f ON s.FOOD_ID = f.FOOD_ID;  -- Join SELLS and FOOD using food_id as foreign key




router.get('/customer/cart/:nid', async (req, res) => {
    const customerId = req.params.nid;

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const query = `
            SELECT "Food Name", "Quantity", "Original Price", "Discounted Price", "Discount Amount", "Food Image"
            FROM Cart_View
            WHERE "Customer ID" = :nid
        `;

        const result = await connection.execute(query, [customerId], { outFormat: oracledb.OUT_FORMAT_OBJECT });

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No items found in the cart.' });
        }

        res.json(result.rows);

    } catch (err) {
        console.error('Error fetching cart data:', err);
        res.status(500).json({ error: 'Failed to fetch cart data' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
});

module.exports = router;


