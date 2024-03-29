from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#models below
class User(db.Model):
    __tablename__ = 'users'

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

    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")

    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, 
                           nullable= False,
                           default =  datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    @property
    def friendly_date(self):
        """formatted date"""

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")
    
class PostTag(db.Model):
    
    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    posts = db.relationship(
        'Post',
        secondary="posts_tags",
        backref="tags",
    )


def connect_db(app):
    db.app = app
    db.init_app(app)