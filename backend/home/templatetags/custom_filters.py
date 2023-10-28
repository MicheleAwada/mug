# custom_filters.py
from django import template
from math import log10

register = template.Library()

@register.filter(name='abbreviate')
def abbreviate(numinp, dec=1):
    Big_Names = [
        "",
        "k",
        "m",
        "b",
    ]

    exp = max(0, min(100, int(0 if numinp == 0 else log10(abs(numinp)) // 3)))
    num = numinp * 10 ** 3 // 10 ** (exp * 3) / 10 ** 3 if exp > 0 else numinp * dec // 1 / dec
    return f'{int(num) if exp == 0 and dec == 1 else num} {Big_Names[exp].capitalize()}'


