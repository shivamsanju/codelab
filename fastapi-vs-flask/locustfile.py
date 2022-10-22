from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def flask_test(self):
        self.client.get("/sleep")


