SELECT city, count(reservations.id) as total_reservations
FROM reservations
  JOIN properties on property_id = properties.id
GROUP BY city
ORDER BY total_reservations DESC;