CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE city_id_seq;
CREATE SEQUENCE national_id_images_seq;
CREATE SEQUENCE driver_photos_seq;
CREATE SEQUENCE driver_licenses_seq;
CREATE SEQUENCE drivers_seq;
CREATE SEQUENCE cars_seq;
CREATE SEQUENCE license_back_images_seq;
CREATE SEQUENCE license_front_images_seq;
CREATE SEQUENCE front_photos_seq;
CREATE SEQUENCE car_models_seq;
CREATE SEQUENCE trip_id_seq;
CREATE SEQUENCE price_id_seq;
CREATE SEQUENCE admin_id_seq;
CREATE SEQUENCE customer_id_seq;
CREATE SEQUENCE colors_id_seq;
CREATE SEQUENCE notes_id_seq;

CREATE TABLE IF NOT EXISTS notes(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('notes_id_seq'),
    note text,
    driver  integer REFERENCES drivers(id) ON DELETE RESTRICT,
    trip  integer REFERENCES trips(id) ON DELETE RESTRICT,
    customer text
);

CREATE TABLE IF NOT EXISTS emails(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('emails_id_seq'),
    email text,
    date TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE IF NOT EXISTS colors(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('colors_id_seq'),
    ar_color text,
    en_color text,
);

CREATE TABLE IF NOT EXISTS customers (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('customer_id_seq'),
    name text,
    whatsapp_number text UNIQUE
);

CREATE TABLE IF NOT EXISTS admins (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('admin_id_seq'),
    name text,
    mobile_number text,
    username text UNIQUE,
    password text,
    role text DEFAULT 'EMPLOYEE',
    enabled BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS prices (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('price_id_seq'),
    duration text,
    price text,
    to_city text,
    from_city text
);

CREATE TABLE IF NOT EXISTS users (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('user_id_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    first_name text,
    last_name text,
    date_of_birth date,
    whatsapp_number text,
    mobile_number text UNIQUE,
    user_type varchar(10)
);

CREATE TABLE IF NOT EXISTS cities (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('city_id_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    english_name text,
    arabic_name text
);

CREATE TABLE IF NOT EXISTS cars (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('cars_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    make text,
    model text,
    color text,
    license_number text,
    license_expire_date date,
    year_of_manufacture date,
    driver_id integer REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS drivers (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('drivers_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    city_of_residence_id integer REFERENCES cities(id) ON DELETE RESTRICT,
    favourite_destination_id integer REFERENCES cities(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS national_id_images (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('national_id_images_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    driver_id integer REFERENCES drivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS driver_photos (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('driver_photos_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    driver_id integer REFERENCES drivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS driver_licenses (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('driver_licenses_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    driver_id integer REFERENCES drivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS car_license_back_images (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('license_back_images_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    car_id integer REFERENCES cars(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS car_license_front_images (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('license_front_images_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    car_id integer REFERENCES cars(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS car_front_photos(
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('front_photos_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    key text,
    url text,
    car_id integer REFERENCES cars(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS car_models (
    id integer NOT NULL PRIMARY KEY DEFAULT nextval('car_models_seq'),
    created_at TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL,
    make text,
    model text,
    minimum_year text
);

CREATE TABLE IF NOT EXISTS trips (
  id integer NOT NULL PRIMARY KEY DEFAULT nextval('trip_id_seq'),
  customer_name text,
  whatsapp_number text,
  start_at TIMESTAMP,
  from_address text,
  to_address text,
  waiting_hours integer,
  one_way BOOLEAN DEFAULT false,
  status varchar(10) DEFAULT 'NEW',
  driver integer REFERENCES drivers(id) ON DELETE RESTRICT,
  moderator integer REFERENCES admins(id) ON DELETE RESTRICT,
  duration float DEFAULT NULL
);