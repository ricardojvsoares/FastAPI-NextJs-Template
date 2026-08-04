from fastapi import APIRouter, Depends, HTTPException, status

from src.auth.users import (
    UserManager,
    auth_backend,
    current_active_user,
    fastapi_users,
    get_user_manager,
)
from src.models.user import User
from src.schemas.password import ChangePasswordRequest
from src.schemas.user import UserCreate, UserRead, UserUpdate

router = APIRouter()

router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@router.post(
    "/auth/change-password",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["auth"],
)
async def change_password(
    body: ChangePasswordRequest,
    user: User = Depends(current_active_user),
    user_manager: UserManager = Depends(get_user_manager),
) -> None:
    verified, _ = user_manager.password_helper.verify_and_update(
        body.current_password,
        user.hashed_password,
    )
    if not verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect current password",
        )

    await user_manager.update(
        UserUpdate(password=body.new_password),
        user,
        safe=True,
    )
