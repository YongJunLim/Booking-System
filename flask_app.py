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
        if request.form['cherName']:
            cherName = request.form.get('cherName')
            return render_template("booking-consult.html", email=True, cherName = cherName)
        elif request.form['Bookings']:
            # YH do yr thing
            return redirect(url_for('bookingConsult'))

@app.route('/create', methods=['POST', 'GET'])
def bookingCreate():
    if request.method == 'GET':
        return render_template('booking-create.html',email=True)
    elif request.method == 'POST':

        ref_code = "Biku"
        # Replace placeholder

        # array_2d = ["Yeet",["2020-03-05 to 2020-03-07","12:00 PM","6:00 PM","15min"],["2020-03-06","6:00 AM","12:00 PM","30min"]]
        # Replace placeholder
        array_2d = request.form['createBooking']

        # Need ref_code algorithm
        # Need data 2d_array from the page

        # create_event(array_2d, ref_code)

        return redirect(url_for('bookingCreate'))