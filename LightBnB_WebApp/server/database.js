const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'lightbnb',
  user: 'vagrant',
  password: '123'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const query = `SELECT id, name, email, password FROM users WHERE email = $1`;

  return pool
  .query(query, [email])
  .then((result) => result.rows[0])
  .catch((err) => console.log(err.message));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = `SELECT id, name, email, password FROM users WHERE id = $1`;

  return pool
  .query(query, [id])
  .then((result) => result.rows[0])
  .catch((err) => console.log(err.message));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `INSERT INTO users(name, email, password) values($1, $2, '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.') RETURNING *;`;

  return pool
  .query(query, [user.name, user.email])
  .then((result) => result.rows[0])
  .catch((err) => console.log(err.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `  
    SELECT properties.*, 
      reservations.start_date, 
      avg(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties on reservations.property_id = properties.id
    JOIN property_reviews on reservations.property_id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    and reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id  
    ORDER BY start_date
    LIMIT $2`;

    console.log(guest_id, limit);
  return pool
  .query(query, [guest_id, limit])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */


const getAllProperties = function (options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE true 
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id $${queryParams.length} `;
  }

  if(options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  if(options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id `;
  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  if(options.maximum_price_per_night || options.minimum_price_per_night) {
    queryString += ` ORDER BY cost_per_night `;
  }

  queryParams.push(limit);
  queryString += ` LIMIT $${queryParams.length};
  `;

return pool.query(queryString, queryParams).then((res) => res.rows).catch((err) => console.log(err.message));;
};


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const query = 
    `INSERT INTO properties
      (title, 
       description, 
       owner_id, 
       cover_photo_url, 
       thumbnail_photo_url, 
       cost_per_night, 
       parking_spaces, 
       number_of_bathrooms, 
       number_of_bedrooms, 
       active, 
       province, 
       city, 
       country, 
       street, 
       post_code
       )
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;`;

  const params = [property.title, 
                  property.description, 
                  property.owner_id, 
                  property.cover_photo_url, 
                  property.thumbnail_photo_url, 
                  property.cost_per_night, 
                  property.parking_spaces, 
                  property.number_of_bathrooms, 
                  property.number_of_bedrooms, 
                  true, 
                  property.province, 
                  property.city, 
                  property.country, 
                  property.street, 
                  property.post_code];

  return pool
    .query(query, params)
    .then(result => result.rows[0] )
    .catch((err) => console.log(err.message));
}
exports.addProperty = addProperty;
