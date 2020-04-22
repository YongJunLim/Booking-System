import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash

# variable 'email' as gmail
def Check_Existence(email):

    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )
    
    table_name = Hash(email)

    tables = db.table_names()

    exist = False

    for i in range(len(tables)):
        if tables[i] == table_name:
            exist = True

    if exist is False:
        return "New User"
    else:
        
        return "Existing User"