import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash

def data_to_booking(ref_code, user_email):
    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )

    sql_query = 'SELECT Start_Date, End_Date, Start_Time, End_Time, Slot_Duration, Event_Name FROM event_details WHERE Ref_Code = %s' % (ref_code)
    with db.connect() as conn:
        event_data = conn.execute(sql_query)

    event_data = event_data.fetchall()

    sql_query = 'SELECT Creator_Email FROM event_details WHERE Ref_Code = %s' % (ref_code)
    with db.connect() as conn:
        creator_email = conn.execute(sql_query)

    creator_email = creator_email.fetchone() 

    table_name = Hash(creator_email[0])

    sql_query = "SELECT Date, Start_Time FROM %s WHERE Ref_Code = %s AND Email = '%s'" % (table_name, ref_code, user_email)

    with db.connect() as conn:
        my_booked = conn.execute(sql_query)

    my_booked = my_booked.fetchall()

    sql_query = "SELECT Date, Start_Time FROM %s WHERE Ref_Code = %s AND Email != '%s'" % (table_name, ref_code, user_email)

    with db.connect() as conn:
        other_booked = conn.execute(sql_query)

    other_booked = other_booked.fetchall()

    return event_data, my_booked, other_booked
    # 2d array with inside array as [Start_Date, End_Date, Start_Time, End_Time, Slot_Duration, Event_Name]
    # 2d array with inside array as [Date, Start_Time]
    # 2d array with inside array as [Date, Start_Time]
