from flask import Flask, render_template
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

@app.route('/booking-consult')
def bookingConsult():
    return render_template('booking-consult.html',email=True)

@app.route('/create', methods=['POST', 'GET'])
def bookingCreate():
    if request.method == 'GET':
        return render_template('booking-create.html',email=True)
    elif request.method == 'POST':
        # for Yu Hsuan to send to database
        """ Original Code
        DB_in_slot = request.form['Bookings']
        DB_in_slot = manipulate(DB_in_slot) #2D Array
        remove(DB_in_slot, email, outTeachers)
        To replace request.form['Bookings']
        with request.form['create-booking']
         """
        return redirect(url_for('bookingCreate'))