# Abonne Backend

## Running the project locally

1. Clone the repo into a suitable directory

```bash
git clone https://github.com/ahmedaabouzied/abonne-backend.git
cd abonne-backend
```

2. Create a postgres database and a user that has all privileges on this database.

3. Login to postgres as the recently created user and run the `create_table.sql`, `seed_cities.sql` files in the `/sql` directory to create the tables and seed the cities table with initial data.

```bash
dbuser=# \i <path to the create_table.sql file>;
```

4. Create a .env file in the root directory to hold your environment variables

Here is an example .env file :

```bash
DBNAME=
DBHOST=
DBPASSWORD=
DBUSER=
PORT=
AWS_KEY=<the key sent to you privately>
AWS_SECRET=<the secret key sent to you privately>
```

5. Build and run the server

```bash
npm run build && npm run start
```
