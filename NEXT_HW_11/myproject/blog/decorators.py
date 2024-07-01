from django.utils import timezone
from functools import wraps

def update_last_viewed(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        response = func(request, *args, **kwargs)
        article_id = kwargs.get('article_id')
        if article_id and request.user.is_authenticated:
            from .models import Article  
            article = Article.objects.get(id=article_id)
            article.last_viewed = timezone.now()
            article.last_viewed_by = request.user
            article.save()
        return response
    return wrapper
