import os

from flask import Flask, render_template, redirect, url_for, request

import google_auth

import json

from check_existence import Check_Existence
from create_event import create_event
from my_events import view_my_events
from view_booking import View_Booking_By_Time, View_Booking_By_Event
from new_user import New_User
from data_to_booking import data_to_booking
from new_slot_booking import create_slot_record
from cancel import cancel

app = Flask(__name__)
app.config['IMAGES_FOLDER'] = os.path.join('static', 'images')
app.secret_key = os.environ.get('SECRET_KEY')

app.register_blueprint(google_auth.app)

@app.route('/')
def home():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        if Check_Existence(email) == 'New User':
            New_User(email)
        return redirect(url_for("view_bookings"))
    else:
        return render_template("home.html") # Landing page before logged in

@app.route('/view-bookings', methods=["GET", "POST"])
def view_bookings():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        array_2d = View_Booking_By_Time(email)
        array_3d = View_Booking_By_Event(email)
        if request.method=="GET":
            return render_template('view-bookings.html', email=email, picture=picture,
        name=name, events_2d = array_2d, events_3d = array_3d, view_type="event")

        else:
            view_type=request.form.get("view_type")
            return render_template('view-bookings.html', email=email, picture=picture,
        name=name, events_2d = array_2d, events_3d = array_3d, view_type=view_type)
            
        # Format [ [Start_Time, End_Time, Meet_Who, Ref_Code, Date] ]
    else:
        return redirect(url_for("google_auth.login"))


@app.route('/my-events', methods=["GET", "POST"])
def my_events():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        events = view_my_events(email)
        return render_template('my-events.html', email=email, picture=picture, name=name, events = events)
            
        # Format [ [Start_Time, End_Time, Meet_Who, Ref_Code, Date] ]
    else:
        return redirect(url_for("google_auth.login"))


@app.route('/booking-consult', methods=["GET", "POST"])
def bookingConsult():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        if request.method == 'GET':
            return render_template('booking-consult.html',email=email, picture=picture, name=name)
        elif request.method == 'POST':
            refCode = request.form.get('refCode')
            new_bookings = request.form.get("newBookings")
            if new_bookings is None:  # user is searching for event/booking using refCode, return a set of timings and dates for user to book
                try:
                    time_ranges, bookedSlots, blocked = data_to_booking(refCode, email)
                    error = 0
                except:
                    time_ranges = []
                    bookedSlots = []
                    blocked = []
                    error = 1
                return render_template("booking-consult.html", email=email,
                picture=picture, name=name, refCode=refCode, bookedSlots=bookedSlots,
                blocked=blocked, timeRanges=time_ranges, error=error)

            elif new_bookings is not None:  # User has applied for an event/booking

                cancelled_bookings = request.form.get("cancelledBookings")
                cancel(email, cancelled_bookings, refCode)
                collison = create_slot_record(email, name, new_bookings, refCode)

                time_ranges, bookedSlots, blocked = data_to_booking(refCode, email)
                return render_template("booking-consult.html", email=email,
                picture=picture, name=name, refCode=refCode, bookedSlots=bookedSlots,
                blocked=blocked, timeRanges=time_ranges, collison = collison)
    else:
        return redirect(url_for("google_auth.login"))

@app.route('/create', methods=['POST', 'GET'])
def bookingCreate():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        if request.method == 'GET':
            return render_template('booking-create.html', email=email, picture=picture, name=name)
        elif request.method == 'POST':
            if '""' in request.form['create-booking'] \
            or 'Select Duration' in request.form['create-booking']:
                # some fields not selected
                error = 'Error with booking. Please try again.'
                return render_template('booking-create.html', email=email, picture=picture,
                name=name, error=error)
            
            array_2d = json.loads(request.form['create-booking'])

            ref_code = create_event(array_2d, email, name)

            return render_template("confirmation.html", email=email, picture=picture, name=name, refCode = ref_code)
    else:
        return redirect(url_for("google_auth.login"))

@app.route("/help")
def help():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        email = user_info['email']
        picture = user_info['picture']
        name = user_info['name']
        return
    else:
        return redirect(url_for("google_auth.login"))

@app.route('/miku')
def miku():
    full_filename = os.path.join(app.config['IMAGES_FOLDER'], 'FirstSoundOfTheFuture.jpg')
    return render_template("yes.html", img_data = full_filename)

@app.route('/test')
def test():
    user_info = google_auth.get_user_info()
    email = user_info['email']

    return str(View_Booking_By_Event(email))