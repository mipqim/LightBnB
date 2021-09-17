SELECT reservations.id, 
       properties.title, 
       properties.cost_per_night, 
       reservations.start_date, 
       avg(property_reviews.rating) AS average_rating
FROM reservations
  JOIN properties on reservations.property_id = properties.id
  JOIN property_reviews on reservations.property_id = property_reviews.property_id
WHERE guest_id = 1
  and end_date < now()::date
GROUP BY reservations.id  
ORDER BY start_date
LIMIT 10;
