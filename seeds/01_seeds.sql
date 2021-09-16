INSERT INTO users (name, email, password)
VALUES 
  ('1111', '111@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('2222', '222@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('3333', '333@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('4444', '444@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO 
  properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url, 
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code
    )
VALUES (
    1,
    '11house',
    'description',
    'cdn://kjsdf.com/dasd11.gif',
    'cdn://kjsdf.com/dasd11.png',
    100,
    1,
    1,
    1,
    'CA',
    '12044',
    'Vancouver',
    'BC',
    'V2X8J1'
), 
(
    2,
    '22house',
    '22description',
    'cdn://kjsdf.com/dasd22.gif',
    'cdn://kjsdf.com/dasd22.png',
    200,
    2,
    2,
    2,
    'CA',
    '22044',
    'Burnaby',
    'BC',
    'V2X8J2'
), 
(
    3,
    '33house',
    '33description',
    'cdn://kjsdf.com/dasd33.gif',
    'cdn://kjsdf.com/dasd33.png',
    300,
    3,
    3,
    3,
    'CA',
    '32044',
    'Langley',
    'BC',
    'V2X8J3'
), 
(
    4,
    '44house',
    '44description',
    'cdn://kjsdf.com/dasd44.gif',
    'cdn://kjsdf.com/dasd44.png',
    300,
    4,
    43,
    43,
    'CA',
    '42044',
    'Port Moody',
    'BC',
    'V2X8J4'
);

INSERT INTO reservation 
(
  start_date,
  end_date,
  property_id,
  guest_id
)
VALUES
(
  '2011-01-01',
  '2011-11-11',
  1,
  4
),
(
  '2012-02-02',
  '2012-12-22',
  2,
  3
),
(
  '2013-03-03',
  '2013-04-05',
  1,
  3
);

INSERT INTO property_reviews
(
  guest_id,
  property_id,
  reservation_id,
  rating,
  message
)
VALUES
(
  4,
  1,
  1,
  5,
  'message1'
),
(
  3,
  1,
  3,
  2,
  'message2'
),
(
  3,
  2,
  2,
  4,
  'message3'
);