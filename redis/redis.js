const express = require("express");
const Redis = require("ioredis");
const axios = require("axios");

const app = express();

app.listen(8000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("Server is started on port 8000");
  }
});

// setting up redis
const redis = new Redis({
  host: "redis-18719.c99.us-east-1-4.ec2.cloud.redislabs.com",
  port:18719,
  username: "default",
  password: "y0DLKlDwCEtgypBxd0MVz61wPEyQrbBU",
});


const tryFromCache = async (req, res, next) => {
  try {
    let id = req.params.id;
    salary = await redis.get(id);
    if (salary) {
      res.send(`salary is ${salary}`);
      console.log("Fetched the data from redis...");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchSalary = async (req, res) => {
  try {
    let id = req.params.id;
    let response = await axios.get(
      `https://dummy.restapiexample.com/api/v1/employee/${id}`
    );
    salary = response.data.data.employee_salary;

    await redis.set(id, salary, (err) => {
      if (err) throw err;
    });

    console.log("Fetched the data from server...");
    res.send(`salary is ${salary}`);
  } catch (err) {
    console.log(err);
  }
};

app.get("/:id",  fetchSalary);
