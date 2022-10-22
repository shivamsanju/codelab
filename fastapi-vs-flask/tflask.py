from flask import Flask
import asyncio


app = Flask(__name__)


@app.route("/sleep")
async def root():
    await asyncio.sleep(0.001)
    return "successful"


if __name__ == "__main__":
    app.run(threaded=False)

