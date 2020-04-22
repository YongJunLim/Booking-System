import sqlalchemy
from sqlalchemy import create_engine
import time


def view_my_events(email):

    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )

    sql_query = 'SELECT * FROM event_details WHERE Creator_Email = "%s"' % (email)
    with db.connect() as conn:
        events = conn.execute(sql_query)
    events = events.fetchall()

    dict_keys = ['Event_Name', 'Start_Date', 'End_Date', 'Start_Time', 'End_Time', 'Slot_Duration', 'Config_Num', 'Creator_Name', 'Creator_Email', 'ref_code']
    
    events_json = []
    for event in events:
        new_dict = {dict_keys[i]: event[i] for i in range(len(event))}
        events_json.append(new_dict)
    events_json = sorted(events_json,  key=lambda x: time.strptime(x['Start_Date']+x['Start_Time'],"%Y-%m-%d%H:%M"))
    return events_json

