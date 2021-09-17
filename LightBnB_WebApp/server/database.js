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
const getAllProperties = function(options, limit = 10) {
  return pool
  .query('SELECT properties.*, avg(property_reviews.rating) AS average_rating FROM properties  JOIN property_reviews on properties.id = property_reviews.property_id GROUP BY properties.id LIMIT $1',[limit])
  .then((result) => result.rows)
  .catch((err) => console.log(err.message));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
