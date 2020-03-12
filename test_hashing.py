from time import time
from hashlib import sha3_512
from secrets import choice

def generateRefCode(ID):

    digest = sha3_512(ID.encode('utf-8')).hexdigest().upper()
    refCode = ''.join(choice(digest) for i in range(6))
    return refCode
