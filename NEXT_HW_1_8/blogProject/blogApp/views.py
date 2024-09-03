from django.shortcuts import render, redirect
from .models import Article
from datetime import datetime
# Create your views here.
def new(request):
    if request.method == 'POST':
        print(request.POST)

        new_article = Article.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            time = datetime.now(),
            category = request.POST['category'],
        )
        return redirect('list')
    categories = ['hobby', 'daily', 'programming']
    return render(request, 'new.html', {'categories': categories})

def list(request):
    articles = Article.objects.all()
    hobbies = Article.objects.filter(category = "hobby")
    dailys = Article.objects.filter(category = "daily")
    programmings = Article.objects.filter(category = "programming")

    hobbycnt = hobbies.count()
    dailycnt = dailys.count()
    programmingcnt = programmings.count()

    return render(request, 'list.html', {'articles': articles, 'hobbycnt': hobbycnt, 'dailycnt': dailycnt, 'programmingcnt': programmingcnt})

def detail(request, article_id):
    article = Article.objects.get(pk =article_id)
    return render(request, 'detail.html', {'article': article})

def category(request, category_name):
    articles = Article.objects.filter(category=category_name)
    cnt = articles.count()
    return render(request, 'category.html', {'articles': articles, 'category_name': category_name, 'cnt': cnt} )