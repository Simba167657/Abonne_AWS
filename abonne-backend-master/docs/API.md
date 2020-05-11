# Rest API Documentation

_API_Root URL_ = https://abonne.net/api/v1

## Contents

- [Driver](https://github.com/ahmedaabouzied/abonne-backend/blob/master/docs/API.md#driver)

  - [Create Driver](https://github.com/ahmedaabouzied/abonne-backend/blob/master/docs/API.md#create-driver)
  - [Get All Drivers](https://github.com/ahmedaabouzied/abonne-backend/blob/master/docs/API.md#get-all-drivers)

- [Cities](https://github.com/ahmedaabouzied/abonne-backend/blob/master/docs/API.md#cities)
  - [Get All Cities](https://github.com/ahmedaabouzied/abonne-backend/blob/master/docs/API.md#get-all-cities)

### Driver

#### Create Driver

```http
POST /driver
```

Description : Creates a new driver record.

- Headers :
  - Content-Type : multipart/form-data

The **form-data** body must have the following parameters :

|         Field          |  Type  | Required |    Description     |
| :--------------------: | :----: | :------: | :----------------: |
|      `firstName`       | string |   true   |         -          |
|       `lastName`       | string |   true   |         -          |
|     `dateOfBirth`      | string |   true   | Date in ISO format |
|   `cityOfResidence`    |  int   |   true   |    ID of a city    |
| `favouriteDestination` |  int   |   true   |    ID of a city    |
|        `phone`         | string |   true   |         -          |
|    `whatsappNumber`    | string |   true   |         -          |
|     `driverPhoto`      |  File  |   true   |         -          |
|      `nationalID`      |  File  |   true   |         -          |
|       `carMake`        | string |   true   |         -          |
|       `carModel`       | string |   true   |         -          |
|      `carNumber`       | string |   true   |         -          |
|       `carColor`       | string |   true   |         -          |
| `carYearOfManufacture` | string |   true   |  Year like `2012`  |
|   `carLicenseExpire`   | string |   true   | Date in ISO format |
|    `carFrontPhoto`     |  File  |   true   |         -          |
|  `driverLicensePhoto`  |  File  |   true   |         -          |
|   `carLicenseFront`    |  File  |   true   |         -          |
|    `carLicenseBack`    |  File  |   true   |         -          |

#### Get All Drivers

GET /drivers

Description: Returns an array of all drivers registered on the system.

### Cities

#### Get All Cities

```http
GET /cities
```

Description : Returns an array of all available cities.

### Cars

#### Get Available Car Makes

```http
GET /cars/makes
```

Description: Returns an array of all available car models.

#### Get Car Models For A Car Make

```http
POST /cars/models
```

Description : Returns an array of available car models for the given car make.

The `JSON` body should have the following properties:

| Field  |  Type  | Required | Description |
| :----: | :----: | :------: | :---------: |
| `make` | string |   true   |      -      |
