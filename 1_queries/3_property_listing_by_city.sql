SELECT id, title, cost_per_night, review.average_rating
FROM properties
  JOIN 
    (
    SELECT property_id, avg(rating) as average_rating
    FROM property_reviews
    GROUP BY property_id
    ) as review
  ON id = review.property_id
WHERE city = 'Vancouver'  
  AND review.average_rating >= 4
ORDER BY cost_per_night
LIMIT 10;  

--SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
--FROM properties
--JOIN property_reviews ON properties.id = property_id
--WHERE city LIKE '%ancouv%' <<<<<------ it's not the requirement!
--GROUP BY properties.id
--HAVING avg(property_reviews.rating) >= 4
--ORDER BY cost_per_night
--LIMIT 10;