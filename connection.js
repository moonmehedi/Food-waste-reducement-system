import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

export const connection = async () => {
  try {
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });
    console.log("Connected to database");
    return conn;
  } catch (err) {
    console.error(err);
    throw new Error("Database connection failed");
  }
};

export const run_query = async (query, params) => {
  let conn;
  try {
    conn = await connection();
    const result = await conn.execute(query, params, { autoCommit: true });
    return result.rows;
  } catch (err) {
    console.error("Query execution failed:", err);
    throw new Error("Query execution failed");
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error("Failed to close connection:", err);
      }
    }
  }
};
