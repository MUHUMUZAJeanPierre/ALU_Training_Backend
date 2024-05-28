import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Muhumuza@2308',
    database: 'nida'
}).promise();

export async function getCitizens(){
    const [results] = await pool.query(`SELECT * FROM citizens`);
    return results
}


export async function getCitizen(id){
    const [result] = await  pool.query(`
    SELECT * 
    FROM citizens
    WHERE id = ?
    `, [id]);
    return result[0];
}

export async function createCitizen(id, name, date_of_birth, gender, status) {
    // Correcting the SQL query to include placeholders for all columns
    const [create] = await pool.query(
      `INSERT INTO citizens (id, name, date_of_birth, gender, status) VALUES (?, ?, ?, ?, ?)`,
      [id, name, date_of_birth, gender, status]
    );
    // const id = create.id;
    // Assuming getCitizens accepts an id and returns the created record
    return create;
  }