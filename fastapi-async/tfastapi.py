from fastapi import FastAPI
import asyncio
from starlette.concurrency import run_in_threadpool
sem = asyncio.Semaphore(100)


app = FastAPI()


def printer(text):
    for i in range(100000):   
        print(text)
    return 1


@app.get("/a")
async def root():
    await run_in_threadpool(printer, "Light")
    await asyncio.sleep(5)
    await run_in_threadpool(printer, "Light Again")
    return {"message": "Successful 1"}


@app.get("/b")
async def root2():
    await run_in_threadpool(printer, "Dark")
    # await asyncio.sleep(5)
    await run_in_threadpool(printer, "Dark Again")
    return {"message": "Successful 2"}


@app.get("/{ans}/c")
def root3(ans):
    printer(ans)


@app.get("/{ans}/d")
async def root4(ans):
    await run_in_threadpool(printer, ans)


'''
Conclusions
------------
1. There is a single thread for async. which is non blocking for i/o calls on using await
2. For every sync api, a different thread is used for each api request. This can lead to crashing of server. Even flask does this if multithreading is used.
3. If we use run_in_threadpool inside async it does the same thing as synchronous function(generates a new thread for each request)

'''
