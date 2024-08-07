#!/usr/bin/python3
""" Starts a Flash Web Application """
import uuid
from models import storage
from flask import Flask, render_template
app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/0-hbnb', strict_slashes=False)
def hbnb():
    """Method handles request to custom templates"""
    states = storage.all('State').values()
    stateDict = dict([state.name, state] for state in states)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('0-hbnb.html',
                           cache_id=uuid.uuid4(),
                           stateDict=stateDict,
                           amenities=amenities,
                           places=places,
                           users=users)

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)


# To run app with db
# HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd \
# HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db \
# HBNB_TYPE_STORAGE=db python3 -m web_dynamic.0-hbnb