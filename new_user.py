import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash

def New_User(email):
    table_name = Hash(email)

    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )

    sql_query = 'CREATE TABLE {0}(Date TEXT, Start_Time TEXT, End_Time TEXT , Name TEXT, Email TEXT, Ref_Code TEXT)'.format(table_name)
    with db.connect() as conn:
        conn.execute(sql_query)
