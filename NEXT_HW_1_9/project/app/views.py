from django.shortcuts import render, redirect
from .models import Post
from django.utils import timezone

# Create your views here.
def home(request):
    posts = Post.objects.filter(deadline__gte=timezone.now()).order_by('deadline')

    for post in posts:
        time_left = post.deadline - timezone.now()
        if time_left.days == 0 :
            post.dday = "Day"
        else:
            post.dday = time_left.days
    return render(request, 'home.html', {'posts' : posts})

def new(request):
    if request.method == 'POST':
        new_post = Post.objects.create(
            title = request.POST['title'],
            content = request.POST['content'],
            deadline = request.POST['deadline'],
        )
        return redirect('detail', new_post.pk)
    return render(request, 'new.html')

def detail(request, post_pk):
    post = Post.objects.get(pk=post_pk)

    return render(request, 'detail.html', {'post': post})

def update(request, post_pk):
    post = Post.objects.get(pk=post_pk)

    if request.method == 'POST':
        Post.objects.filter(pk=post_pk).update(
            title = request.POST['title'],
            content = request.POST['content']
        )
        return redirect('detail', post_pk)
    
    return render(request, 'update.html', {'post': post})

def delete(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    post.delete()

    return redirect('home')