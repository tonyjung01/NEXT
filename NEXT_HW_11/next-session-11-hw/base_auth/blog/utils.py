import datetime
from functools import wraps
from pytz import timezone
from django.shortcuts import get_object_or_404, render
from .models import Post


def is_owner_or_admin(request, obj):
    return obj.creator == request.user or request.user.is_superuser


def update_post_lasted_viewed():
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            # 선택한 인자를 kwrags에서 가져옵니다. kwargs는 URL 매칭에서 전달된 인자를 포함합니다.
            post_pk = kwargs.get("post_pk")
            if not post_pk:
                return render(request, "error.html", {"error": "post_pk not found."})

            # Retrieve the object based on ID and your model
            # You might need to adjust this part based on how your models are structured
            post = get_object_or_404(Post, **{"pk": post_pk})

            post.last_viewed_user = request.user
            post.last_viewed_datetime = datetime.datetime.now(timezone("Asia/Seoul"))
            post.save()

            return view_func(request, *args, **kwargs)

        return _wrapped_view

    return decorator
