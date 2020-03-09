from flask import Flask, render_template, redirect, url_for, request
import json

app = Flask(__name__)

@app.route('/')
def home(): # --- to be merged with backend ---
    return render_template('home.html')

@app.route('/homepage')
def view_by_time():

    with open("./test-data/consults_time.json") as f:
        consults = json.load(f)

    with open("./test-data/specials_time.json") as f:
        specials = json.load(f)

    return render_template('view-by-time.html', email=True, consults = consults, specials = specials)


@app.route('/sort_by_event')
def view_by_event():

    with open("./test-data/consults_event.json") as f:
        consults = json.load(f)

    with open("./test-data/specials_event.json") as f:
        specials = json.load(f)

    return render_template('view-by-event.html', email=True, consults=consults, specials=specials)

@app.route('/booking-consult', methods=["GET", "POST"])
def bookingConsult():
    if request.method == 'GET':
        return render_template('booking-consult.html',email=True)
    elif request.method == 'POST':
        cherName = request.form.get('cherName')
        new_bookings = request.form.get("newBookings")
        #if request.form['cherName']:
        if cherName is not None:
            # --- test data for dates ---
            dates = ["2020-03-02", "2020-03-06",
                     "08:00 AM", "04:00 PM", "30min"]
            # --- booked dates ---
            bookedSlots = [["2020-03-02", "08:00 AM"],
                           ["2020-03-02", "09:00 AM"], ["2020-03-03", "11:00 AM"], ["2020-03-03", "03:00 PM"]]
            return render_template("booking-consult.html", email=True, cherName=cherName, dates=dates ,bookedSlots=bookedSlots)
        elif new_bookings is not None:
            cancelled_bookings = request.form.get("cancelledBookings")
            return "New bookings: "+new_bookings+'<br />'+"Cancelled bookings: "+cancelled_bookings
            # YH do yr thing
            return redirect(url_for('bookingConsult'))

@app.route('/booking-update', methods = ["POST"])
def bookingUpdate():
    bookings = request.form.get("Bookings")
    return bookings


@app.route('/create', methods=['POST', 'GET'])
def bookingCreate():
    if request.method == 'GET':
        return render_template('booking-create.html',email=True)
    elif request.method == 'POST':

        ref_code = "Biku"
        # Replace placeholder

        # array_2d = ["Yeet",["2020-03-05 to 2020-03-07","12:00 PM","6:00 PM","15min"],["2020-03-06","6:00 AM","12:00 PM","30min"]]
        # Replace placeholder
        array_2d = json.loads(request.form['create-booking'])

        # Need ref_code algorithm
        # Need data 2d_array from the page

        # create_event(array_2d, ref_code)

        return redirect(url_for('bookingCreate'))

if __name__=="__main__":
    app.run()

    
