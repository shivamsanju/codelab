from fastapi import FastAPI
import asyncio
import uvicorn

app = FastAPI()


@app.get("/sleep")
async def root():
    await asyncio.sleep(0.001)
    return "successful"


if __name__ == "__main__":
    uvicorn.run(app)

