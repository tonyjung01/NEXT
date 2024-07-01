from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User
from django.core.exceptions import ValidationError



class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label="Password", widget=forms.PasswordInput)
    password2 = forms.CharField(
        label="Password Confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = User
        fields = ("username",)
    
    def clean_username(self):
        username = self.cleaned_data['username']
        if len(username) < 8:
            raise ValidationError("Username must be at least 8 characters long.")
        return username
    
    def clean_password1(self):
        password1 = self.cleaned_data['password1']
        if len(password1) < 8:
            raise ValidationError("Password must be at least 8 characters long.")
        return password1
    
    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError("Passwords don't match.")
        # else:
        #     if not password1:
        #         raise forms.ValidationError("Password must be set.")
        #     if not password2:
        #         raise forms.ValidationError("Please confirm your password.")
        return password2
    
    def save(self, commit=True) -> User:
        user = User.objects.create_user(
            username=self.cleaned_data["username"],
            password=self.cleaned_data["password1"],
        )
        if commit:
            user.save()
        return user

class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
