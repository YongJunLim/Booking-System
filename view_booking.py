import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash
import time

def View_Booking_By_Time(email):

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

    # --- Sort by time ---
    with db.connect() as conn:
        bookings = conn.execute('SELECT Start_Time, End_Time, Name, Ref_Code, Date FROM {0} ORDER BY Date, Start_Time'.format(table_name))
    bookings = bookings.fetchall()
    
    dict_keys = ["start_time", "end_time", "person_name", "ref_code", "date"]
    
    bookings_json = []
    for booking in bookings:
        new_dict = {dict_keys[i] : booking[i] for i in range(len(booking))}
        bookings_json.append(new_dict)
    bookings_json = sorted(bookings_json,key=lambda x: time.strptime(x['date']+x['start_time'],"%Y-%m-%d%H:%M"))
    return bookings_json

def View_Booking_By_Event(email):

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
    
    # --- Sort by event ---
    with db.connect() as conn:
        bookings = conn.execute('SELECT Start_Time, End_Time, Name, Ref_Code, Date FROM {0} ORDER BY Ref_Code, Date, Start_Time'.format(table_name))
    bookings = bookings.fetchall()
    events = [] # --- "3D" array ---
    prev_refcode = ""
    for booking in bookings:
        if(len(events)==0 or booking[3]!=prev_refcode): # --- start adding a new event ---
            events.append([booking])
        else:  # --- continuing adding more bookings of the same event --
            events[-1].append(booking)
        prev_refcode = events[-1][-1][-2]

    dict_keys = ["start_time", "end_time", "person_name", "ref_code", "date"]
    events_json = []
    for event in events:
        event_json = []
        for booking in event:
            new_dict = {dict_keys[i] : booking[i] for i in range(len(booking))}
            event_json.append(new_dict)
        event_json = sorted(event_json,key=lambda x: time.strptime(x['date']+x['start_time'],"%Y-%m-%d%H:%M"))
        events_json.append(event_json)
    return events_json