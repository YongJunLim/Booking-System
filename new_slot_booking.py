import sqlalchemy
from sqlalchemy import create_engine
from hash_algo import Hash

def convert_12h_to_24h(Time):
    hr, m = Time.split(':')
    if (m[-2:]=='AM' or m[-2:]=='am') and hr=='12':
        Time = '00:' + m[:2]
    elif (m[-2:]=='PM' or m[-2:]=='pm') and hr!='12':
        Time = str(int(hr)+12) + ':' + m[:2]
    else:
        if len(hr)==1:
            Time = '0' + hr + ':' + m[:2]
        else:
             Time = hr + ':' + m[:2]
    return Time

def record(email, date, start_time, end_time, other_name, other_email, ref_code):
    #Store data of appointments received from other users
    
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

    sql_query = 'INSERT INTO %s(Date, Start_Time, End_Time, Name, Email, Ref_Code) VALUES("%s", "%s", "%s", "%s", "%s", %s)' % (table_name, date, start_time, end_time, other_name, other_email, ref_code)
    with db.connect() as conn:
        conn.execute(sql_query)


def detect_collison(email, date, start_time, end_time):

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
    
    sql_query_check = 'SELECT * FROM %s WHERE Date = "%s" and ((Start_Time >= "%s" and Start_Time < "%s") or (End_Time > "%s" and End_Time <= "%s") or (Start_Time <= "%s" and End_Time >= "%s"));' \
    % (table_name, date, start_time, end_time, start_time, end_time, start_time, end_time)
    
    with db.connect() as conn:
        results = conn.execute(sql_query_check)
        if results.fetchone():  # if found
            return True  # unsuccessful, not inserted
        else:
            return False  # can insert

def string_to_array2d(date_and_timings):
    items = date_and_timings.split('"')
    arr2d = [items[1]]
    for i in range(3, len(items), 4):
        arr2d.append([items[i], items[i+2]])
    return arr2d

def create_slot_record(my_email, my_name, array_2d, ref_code):
    # 2d_array of storing rows of booking data
    # Array inside should be [Other User Name, Other User Email, Start Time, End_Time, Ref_Code, Date]

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

    sql_query = 'SELECT Creator_Name FROM event_details WHERE Ref_Code = %s' % (ref_code)
    with db.connect() as conn:
        creator_name = conn.execute(sql_query)

    creator_name = creator_name.fetchone()

    date = array_2d[0]
    other_user_name = creator_name[0]
    #Placeholder
    other_user_email = creator_email[0]

    for i in range(1, len(array_2d)):
        start_time = convert_12h_to_24h(array_2d[i][0])
        end_time = convert_12h_to_24h(array_2d[i][1])

        if detect_collison(my_email, date, start_time, end_time):
            return ["you", date, start_time, end_time]
        elif detect_collison(other_user_email, date, start_time, end_time):
            return ["other", date, start_time,  end_time]

        else:
            record(my_email, date, start_time, end_time, other_user_name, other_user_email, ref_code)
            # record data for first user
        
            record(other_user_email, date, start_time, end_time, my_name, my_email, ref_code)
            # record data for other user

    return False

        
