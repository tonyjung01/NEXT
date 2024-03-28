from django.shortcuts import render

# Create your views here.
def count(request):
    return render(request, 'count.html')

def result(request):
    text = request.POST['text']
    total_len=len(text)
    real_len = len(text.replace(" ",""))
    wordno = len(text.split())
    return render(request, 'result.html', {'total_len' : total_len, 'real_len' : real_len, 'text' : text, 'wordno' : wordno})
