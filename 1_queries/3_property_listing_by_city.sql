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
