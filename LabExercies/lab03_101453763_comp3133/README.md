# Restaurant API (CRUD with Node.js, Express, and MongoDB)

This is a RESTful API for managing restaurant data, built using **Node.js, Express, and MongoDB** (with Mongoose as the ODM). The API supports full **CRUD operations** along with specific filtering and sorting functionalities.

## Features

- **Create** a new restaurant (`POST /restaurants`)
- **Read** all restaurants (`GET /restaurants`)
- **Read** restaurants sorted by `restaurant_id` (`GET /restaurants?sortBy=ASC/DESC`)
- **Read** restaurants by cuisine (`GET /restaurants/cuisine/:cuisine`)
- **Read** a single restaurant (`GET /restaurants/:id`)
- **Update** a restaurant (`PUT /restaurants/:id`)
- **Delete** a restaurant (`DELETE /restaurants/:id`)
- **Get all Delicatessen restaurants except Brooklyn** (`GET /restaurants/Delicatessen`)

---

## Technologies Used

- **Node.js** (JavaScript runtime)
- **Express.js** (Fast and minimalist web framework)
- **MongoDB Atlas** (Cloud-hosted NoSQL database)
- **Mongoose** (MongoDB Object Modeling for Node.js)
- **dotenv** (Environment variable management)
- **morgan** (HTTP request logging)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kabamehmetali/COMP3133-FullStackII/tree/main/LabExercies/lab03_101453763_comp3133
cd lab3_restaurant_database
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=3000
MONGODB_URI=mongodb+srv://mehmetalikaba:<db_password>@cluster0.hpel7.mongodb.net/lab3_restaurant_database?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

Replace `<db_password>` with your actual MongoDB password.

### 4. Run the Server

```bash
node server.js
```

---

## API Endpoints

### 1. **Create a New Restaurant**
- **URL:** `POST /restaurants`
- **Body (JSON):**
```json
{
  "restaurant_id": "1001",
  "name": "The Culinary Spot",
  "cuisine": "Italian",
  "borough": "Manhattan",
  "city": "New York",
  "address": {
    "building": "123",
    "street": "Broadway",
    "zipcode": "10001"
  },
  "grades": [
    {
      "grade": "A",
      "score": 10
    }
  ]
}
```

### 2. **Get All Restaurants**
- **URL:** `GET /restaurants`
- **Response:** Returns all restaurant details.

### 3. **Get Restaurants Sorted by `restaurant_id`**
- **URL:** `GET /restaurants?sortBy=ASC`
- **URL:** `GET /restaurants?sortBy=DESC`
- **Response:** Returns restaurants sorted by `restaurant_id`.

### 4. **Get Restaurants by Cuisine**
- **URL:** `GET /restaurants/cuisine/Japanese`
- **Response:** Returns all restaurants of the given cuisine.

### 5. **Get a Single Restaurant by ID**
- **URL:** `GET /restaurants/:id`
- **Response:** Returns details of the specific restaurant.

### 6. **Update a Restaurant**
- **URL:** `PUT /restaurants/:id`
- **Body (JSON):**
```json
{
  "name": "Updated Restaurant Name",
  "cuisine": "French",
  "city": "San Francisco"
}
```
- **Response:** Updates the specified restaurant.

### 7. **Delete a Restaurant**
- **URL:** `DELETE /restaurants/:id`
- **Response:** Deletes the specified restaurant.

### 8. **Get Delicatessen Restaurants (Excluding Brooklyn)**
- **URL:** `GET /restaurants/Delicatessen`
- **Response:** Returns only `name`, `cuisine`, and `city` fields.

---

## Postman Collection

You can import the full **Postman Collection** for easy API testing.

1. Download the collection: [RestaurantAPI_Full.postman_collection.json](RestaurantAPI_Full.postman_collection.json)
2. Open **Postman**
3. Click **Import** and select the JSON file.

---

## GitHub Repository

[GitHub Repository Link](https://github.com/kabamehmetali/COMP3133-FullStackII/tree/main/LabExercies/lab03_101453763_comp3133)

---

## License

This project is licensed under the **MIT License**.
