from django.shortcuts import render
from .forms import UserCreationForm
from django.contrib import messages

# Create your views here.
def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been created')
        else:
            messages.warning(request, 'Please check the errors below')
    else:
        form = UserCreationForm()
    context = {'form': form}
    return render(request, "myauth/signup.html", context)