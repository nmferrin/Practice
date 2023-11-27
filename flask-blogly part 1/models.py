from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

#models below
class User(db.Model):
    __tablename__ = 'User'

    id = db.Column(int,
                   primary_key=True,
                   autoincrement=True)
    
    first_name = db.Column(db.Text,
                           nullable=False,
                           unique=True)
    last_name = db.Column(db.Text,
                           nullable=False,
                           unique=True)
    image_url = db.Column(db.Text, nullable=False)

