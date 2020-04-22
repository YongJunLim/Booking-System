import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash

def string_to_array2d(date_and_timings):
    items = date_and_timings.split('"')
    arr2d = [items[1]]
    for i in range(3, len(items), 4):
        arr2d.append([items[i], items[i+2]])
    return arr2d

def cancel(email, array_2d, ref_code):

    array_2d = string_to_array2d(array_2d)

    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )

    sql_query = 'SELECT Creator_Email FROM event_details WHERE Ref_Code = %s' % (ref_code)
    with db.connect() as conn:
        creator_email = conn.execute(sql_query)

    creator_email = creator_email.fetchone()

    creator_table = Hash(creator_email[0])

    my_table = Hash(email)

    date = array_2d[0]

    for i in range(1, len(array_2d)):
        start_time = array_2d[i][0]

        sql_query = 'DELETE FROM %s WHERE (Date = "%s" AND Start_Time = "%s")' % (creator_table, date, start_time)
        with db.connect() as conn:
            conn.execute(sql_query)

        sql_query = 'DELETE FROM %s WHERE Date = "%s" AND Start_Time = "%s"' % (my_table, date, start_time)
        with db.connect() as conn:
            conn.execute(sql_query)