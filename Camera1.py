def prime():

    for i in range(2, 10000):
        p = True
        x = 2
        while x < i:
            if (i % x == 0):
                x = i
                p = False
            x += 1

        if p:
            yield i


p = prime()

while True:
    x = int(input("Enter input: 1"))
    if x == 1:
        print(p.__next__())
    else:
        break

