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


def create_event(array_2d, email, name):
    
    db = sqlalchemy.create_engine(
        sqlalchemy.engine.url.URL(
            drivername="mysql+pymysql",
            username='root',
            password='IWantedMikuSomewhereInThis',
            database='big_thing',
            query={"unix_socket": "/cloudsql/{}".format('dhs-booking-268307:asia-southeast1:big-thing')},
        ),
    )

    with db.connect() as conn:
            refHighest = conn.execute("SELECT Ref_Code FROM event_details ORDER BY Ref_Code DESC LIMIT 1")

    refHighest = refHighest.fetchone()
    if refHighest:  # if not None
        refOneUp = int(refHighest[0]) + 1
    else:
        refOneUp = 1

    # First index is name of event
    # Onwards will contain array in format of ["Start Date to End Date","Start Time","End Time","Slot Duration"]
    Event_Name = array_2d[0]
    array_2d.pop(0)
    
    for i in range(len(array_2d)):
        array_2d[i][0] = array_2d[i][0].split(" to ")

    # Data now in format of [[['Start Date', 'End Date'], 'Start Time', 'End Time', 'Slot Duration']]

    for i in range(len(array_2d)):
        Start_Date = array_2d[i][0][0]
        End_Date = array_2d[i][0][1]
        Start_Time = convert_12h_to_24h(array_2d[i][1])
        End_Time = convert_12h_to_24h(array_2d[i][2])
        Slot_Duration = array_2d[i][3]

        with db.connect() as conn:
            conn.execute("INSERT INTO event_details (Event_Name, Start_Date, End_Date, Start_Time, End_Time, Slot_Duration, Config_Num, Creator_Email, Creator_Name, Ref_Code) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', %s)" % (Event_Name, Start_Date, End_Date, Start_Time, End_Time, Slot_Duration, i+1, email, name, refOneUp))

        return str(refOneUp)