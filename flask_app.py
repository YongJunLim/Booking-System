from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/homepage')
def index():
    return render_template('index.html',email=True)

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