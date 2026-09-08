from fastapi import APIRouter, HTTPException
from app.schemas.user_schema import UserCreate, UserResponse, UserLogin, Token
from app.utils.security import hash_password, verify_password, create_access_token
from app.database.connection import users_collection
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse
from app.utils.security import hash_password

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=Token)
async def login_user(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if user is None or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"])})
    return Token(access_token=token)

    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
    )
    result = await users_collection.insert_one(user.model_dump())

    return UserResponse(id=str(result.inserted_id), email=user.email)