from flask_sqlalchemy import SQLAlchemy
from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    picture = db.Column(db.String, nullable=False)
    caption = db.Column(db.Text)
    edited = db.Column(db.Boolean)
    
    comments=db.relationship('Comment', back_populates='image', cascade='all, delete-orphan')
    likes=db.relationship('Like', back_populates='image', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "picture": self.picture,
            "caption": self.caption,
            "edited": self.edited
        }