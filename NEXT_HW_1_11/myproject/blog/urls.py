from django.urls import path
from . import views
from .views import user_profile, subscribe, unsubscribe
urlpatterns = [
    path('new/', views.new, name='new'),
    path('list/', views.list, name='list'),
    path('detail/<int:article_id>/', views.detail, name='detail'),
    path('update/<int:article_id>/', views.update, name='update'),
    path('delete/<int:article_id>/', views.delete, name='delete'),
    path('delete-comment/<int:article_id>/<int:comment_pk>/', views.delete_comment, name='delete-comment'),
    path('profile/<str:username>/', user_profile, name='user_profile'),
    path('subscribe/<str:username>/', subscribe, name='subscribe'),
    path('unsubscribe/<str:username>/', unsubscribe, name='unsubscribe'),
]