from django.shortcuts import render, redirect
from .models import Article, Comment
from datetime import datetime
from .forms import CommentForm
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

# def detail(request, article_id):
#     article = Article.objects.get(pk =article_id)

#     if request.method == 'POST':
#         content = request.POST['content']
#         Comment.objects.create(
#          article = article,
#          content = content
#         )
#         return redirect('detail', article_id)
    
#     return render(request, 'detail.html', {'article': article})

def detail(request, article_id):
    article = Article.objects.get( pk=article_id)
    comments = article.comments.filter(parent=None)

    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            parent_id = request.POST.get('parent')
            parent_comment = None
            if parent_id:
                parent_comment = Comment.objects.get(id=parent_id)
            Comment.objects.create(
                article=article,
                content=form.cleaned_data['content'],
                parent=parent_comment
            )
            return redirect('detail', article_id=article_id)
    else:
        form = CommentForm()
    return render(request, 'detail.html', {'article': article, 'comments': comments, 'form': form})

def category(request, category_name):
    articles = Article.objects.filter(category=category_name)
    cnt = articles.count()
    return render(request, 'category.html', {'articles': articles, 'category_name': category_name, 'cnt': cnt} )

def update(request, article_id):
    article = Article.objects.get(pk = article_id)

    if request.method == 'POST':
        Article.objects.filter(pk=article_id).update(
            title = request.POST['title'],
            content = request.POST['content']
        )
        return redirect('detail', article_id)
    
    return render(request, 'update.html', {'article': article})

def delete(request, article_id):
    article = Article.objects.get(pk=article_id)
    article.delete()

    return redirect('list')

def delete_comment(request, article_id, comment_pk):
   comment = Comment.objects.get(pk=comment_pk)
   comment.delete()

   return redirect('detail',article_id)

def footer(request):
    return render(request, 'footer.html')