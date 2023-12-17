def get_n(n1, n2):
    return (n1 << 64) + n2


def set_n(n):
    n1 = n >> 64
    n2 = n & ((1 << 64) - 1)
    return n1,n2


i1= 0
i2=1000000
i = 8423784729534829456789876543
print(i)
print(bin(i))
i1, i2 = set_n(i)
print(f"{str(bin(i1))}{str(bin(i2))[2:]}")
print(str(bin(i1)), str(bin(i2))[2:])
print(get_n(i1, i2))
print(get_n(i1, i2) == i)