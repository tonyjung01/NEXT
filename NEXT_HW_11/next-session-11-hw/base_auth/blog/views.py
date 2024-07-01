from django.shortcuts import render

# Create your views here.
from django.shortcuts import redirect, render

from .models import Comment, Post, Subscription
from django.contrib.auth.decorators import login_required
from authapp.permissions import check_is_creator_or_admin
from .utils import update_post_lasted_viewed
from django.contrib.auth import get_user_model


def home(request):
    posts = Post.objects.all()

    return render(request, "home.html", {"posts": posts})


@login_required
def new(request):
    if request.method == "POST":
        title = request.POST["title"]
        content = request.POST["content"]

        new_post = Post.objects.create(
            title=title, content=content, creator=request.user
        )
        return redirect("detail", new_post.pk)

    return render(request, "new.html")


@login_required
@update_post_lasted_viewed()
def detail(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    if request.method == "POST":
        content = request.POST["content"]
        Comment.objects.create(post=post, content=content, creator=request.user)
        return redirect("detail", post_pk)

    return render(request, "detail.html", {"post": post})


@login_required
@check_is_creator_or_admin(Post, "post_pk")
def edit(request, post_pk):
    post = Post.objects.get(pk=post_pk)

    if request.method == "POST":
        title = request.POST["title"]
        content = request.POST["content"]
        Post.objects.filter(pk=post_pk).update(title=title, content=content)
        return redirect("detail", post_pk)

    return render(request, "edit.html", {"post": post})


@login_required
@check_is_creator_or_admin(Post, "post_pk")
def delete(request, post_pk):
    post = Post.objects.get(pk=post_pk)
    post.delete()
    return redirect("home")


@login_required
@check_is_creator_or_admin(Comment, "comment_pk")
def delete_comment(request, comment_pk):
    comment = Comment.objects.get(pk=comment_pk)
    post_pk = comment.post.pk
    comment.delete()

    return redirect("detail", post_pk)


@login_required
def my_page(request, owner_pk):
    visitor = request.user

    owner = get_user_model().objects.get(pk=owner_pk)

    is_subscribed = False
    if visitor.subscriptions.filter(owner=owner).exists():
        is_subscribed = True

    return render(
        request,
        "my-page.html",
        {"owner": owner, "visitor": visitor, "is_subscribed": is_subscribed},
    )


@login_required
def subscribe(request, owner_pk):
    owner = get_user_model().objects.get(pk=owner_pk)
    subscriber = request.user

    existing = Subscription.objects.filter(subscriber=subscriber, owner=owner)
    if existing.exists():
        return redirect("my-page", owner_pk)

    subscription = Subscription.objects.create(subscriber=subscriber, owner=owner)
    subscription.save()

    return redirect("my-page", owner_pk)
