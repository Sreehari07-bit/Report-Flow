from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.database.connection import users_collection
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse, UserLogin, Token
from app.utils.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserResponse)
async def register_user(user_in: UserCreate):
    existing = await users_collection.find_one({"email": user_in.email})
    if existing is not None:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        full_name=user_in.full_name,
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
    )
    result = await users_collection.insert_one(user.model_dump())

    return UserResponse(
        id=str(result.inserted_id),
        full_name=user.full_name,
        email=user.email,
    )


@router.post("/login", response_model=Token)
async def login_user(credentials: UserLogin):
    user = await users_collection.find_one({"email": credentials.email})
    if user is None or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"])})
    return Token(
        access_token=token,
        full_name=user.get("full_name") or user["email"].split("@")[0],
        email=user["email"],
    )


@router.post("/token", response_model=Token)
async def login_for_swagger(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await users_collection.find_one({"email": form_data.username})
    if user is None or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"])})
    return Token(
        access_token=token,
        full_name=user.get("full_name") or user["email"].split("@")[0],
        email=user["email"],
    )