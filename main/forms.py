from django.forms import ModelForm
from main.models import Product
from django.utils.html import strip_tags

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ["name", "price" , "description", "category", "thumbnail", "is_featured"]
    
    def clean_name(self):
        name = self.cleaned_data["name"]
        return strip_tags(name)

    def clean_product(self):
        product = self.cleaned_data["product"]
        return strip_tags(product)