from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
from deta import Deta
from typing import Optional
from concurrent.futures import as_completed, ThreadPoolExecutor
from requests_futures.sessions import FuturesSession
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

    
deta = Deta("d080wxnt_KDKRB3y4yFjMVw3DFoNjHrHG9C4P54Rh")

users = deta.Base("users")
complaints = deta.Base("complaints")
images = deta.Drive("images")
chats = deta.Base("chats")


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://reunite-e4e4b.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get():
    return {"message": "welcome to Reunite"}


@app.get("/user")
async def get_all_user():
    res = users.fetch()

    res = [{key : val for key, val in sub.items() if key != 'password'} for sub in res._items]

    return {"result": res}


@app.post("/user")
async def get_user(key):
    res = users.fetch({
        "key": key
    })

    if res._count == 0:
        return {"message": "failed"}
    else:
        del res._items[0]['password']
        return {"message": "success", "res": res._items[0]}


@app.post("/signup")
async def sign_up(email, password):
    res = users.fetch({
        "email": email,
    })

    if res._count == 0:
        res = users.insert({
            "email": email,
            "password": password,
            "name": "Guest",
            "profilePic": "https://4781hy.deta.dev/image/blank-profile-picture-973460_640.webp",
        })

        del res["password"]

        return {"message": "success", "result": res}

    else:
        return {"message": "failed"}


@app.post("/login")
async def login(email, password):
    res = users.fetch({
        "email": email,
        "password": password
    })

    if res._count == 0:
        return {"message": "failed"}
    else :
        del res._items[0]["password"]
        return {"message": "success", "res": res._items[0]}


@app.put("/update")
async def update_profile(key, name, mobNo, address, city , country, pincode, file: Optional[UploadFile] = None):
    
    if file != None:
        fname = file.filename
        f = file.file
        fImage = images.put(fname, f)
        fImage = 'https://4781hy.deta.dev/image/' + fImage
    else:
        fImage = ''

    res = users.fetch({"key": key})

    if res._count == 0:
        return {"message": "failed"}

    
    res = users.put({
        "email": res._items[0]['email'],
        "password": res._items[0]['password'],
        "key": key,
        "name": name,
        "mobNo": mobNo,
        "address": address,
        "city": city,
        "country": country,
        "pincode": pincode,
        "profilePic": res._items[0]['profilePic'] if fImage == '' else fImage,
    })


    del res['password']

    return {"message": "success", "res": res }

@app.get("/image/{name}", response_class=StreamingResponse)
def get_image(name: str):
    res = images.get(name)
    return StreamingResponse(res.iter_chunks(1024), media_type="image/jpg")


@app.post("/complaints")
async def raise_complaint(userId: str, name: str, age: int, eyeColor, faceColor, hairColor, height, weight, file: UploadFile = File(...)):
    user = users.fetch({'key': userId})

    if user._count == 0:
        return {"message": "failed"}

    fname = file.filename
    f = file.file
    res = images.put(fname, f)

    complaints.insert({
        "userId": userId,
        "complainerName": user._items[0]['name'],
        "complainerMobNo": user._items[0]['mobNo'],
        "complainerPic": user._items[0]['profilePic'],
        "name": name,
        "age": age,
        "eyeColor": eyeColor,
        "faceColor": faceColor,
        "hairColor": hairColor,
        "height": height,
        "weight": weight,
        "image": file.filename,
        "imageUrl": 'https://4781hy.deta.dev/image/' + res,
    })
   
    return {"message": "success"}


@app.get("/complaints")
async def get_complaint():
    result = complaints.fetch()

    return {"result": result}


@app.post("/compare")
async def compare_faces(file: UploadFile = File(...)):

    allComplaints = complaints.fetch()
    allResponse = []

    name = file.filename
    f = file.file
    res = images.put(name, f)

    imageOne = 'https://4781hy.deta.dev/image/' + res

    api_url = 'https://api-us.faceplusplus.com/facepp/v3/compare'

    session = FuturesSession(executor=ThreadPoolExecutor(max_workers=9))

    futures=[]

    count = 0

    for i in allComplaints._items:
        imageTwo = i['imageUrl']

        params = None

        if count % 3 == 0:

            params = {
                'api_key': 'xQLsTmMyqp1L2MIt7M3l0h-cQiy0Dwhl', 
                'api_secret' : 'TyBSGw8NBEP9Tbhv_JbQM18mIlorY6-D',
                'image_url1':  imageOne,
                'image_url2':  imageTwo
            }

        elif count % 3 == 1 :

            params = {
                'api_key': '0Rngaa_HRVMuvTZfpd9uFJFiFaamaUBL', 
                'api_secret' : 'SOvqjLhnfbXKdmosAYxJPj0nL1weHHRi',
                'image_url1':  imageOne,
                'image_url2':  imageTwo
            }
        else :

            params = {
                'api_key': 'BvkInsFHnqVTdXeIpeuodJhXTiKzLg9e', 
                'api_secret' : 'q19SnuLMt9ov51YcPvMhVsMP9ZO3g1tl',
                'image_url1':  imageOne,
                'image_url2':  imageTwo
            }

        
        future = session.post(api_url, params)
        future.i = i
        futures.append(future)

        count += 1

    for future in as_completed(futures):
        resp = future.result()
        resp = resp.json()

        confidence = "Not Defined"

        if 'confidence' in  resp:
            confidence = resp['confidence']

        allResponse.append({
            "confidence": confidence,
            "complaint": future.i,
        })

    return {"message": "success", "response": allResponse}


@app.post("/chat/send")
async def send_message(message: str, senderId, receiverId):

    chats.insert({
            "message": message,
            "senderId": senderId,
            "receiverId": receiverId
    })

    return {
        "message": "success"
    }

@app.get("/chat/{senderId}/{receiverId}")
async def get_chat_data(senderId, receiverId):

    chat_result = chats.fetch([{
        "senderId":senderId,
        "receiverId": receiverId
    }, {
        "senderId": receiverId,
        "receiverId": senderId
    }])

    return {
        "result": chat_result
    }

@app.get("/chat/list")
async def get_chat_list(senderId):

    chat_result = chats.fetch({
        "senderId": senderId,
    })

    res = [sub['receiverId'] for sub in chat_result._items]


    chat_result = chats.fetch({
        "receiverId": senderId
    })

    for sub in chat_result._items:
        res.append(sub['senderId'])

    modified_res = set()
  
    for item in res:
        if item not in modified_res:
            modified_res.add(item)


    return {"message": "success", "list": modified_res}