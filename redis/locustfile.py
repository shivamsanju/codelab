from locust import HttpUser, task
import random 

class HelloWorldUser(HttpUser):
    @task
    def flask_test(self):
        self.client.get("/123")


