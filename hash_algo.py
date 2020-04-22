def Hash(email):
    hashed = ''
    for index in email:
        if index.isalpha():
            if ord(index)-25 < 97:
                hashed = hashed + chr(ord(index)+1)
            else:
                hashed = hashed + chr(ord(index)-25)
        else:
            hashed = hashed + '_'
    return hashed
