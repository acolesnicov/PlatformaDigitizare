from xml.sax.saxutils import prepare_input_source
from django.urls import path
from .views import get_file, preprocess, heterogen, ocr, transliterate

urlpatterns = [
    path('get_file/', get_file),
    path('preprocess/', preprocess),
    path('heterogen/', heterogen),
    path('ocr/', ocr),
    path('transliterate/', transliterate),
]
