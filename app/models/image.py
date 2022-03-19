from flask_sqlalchemy import SQLAlchemy
from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,  db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    picture = db.Column(db.String, nullable=False)
    caption = db.Column(db.Text)
    edited = db.Column(db.Boolean)
    
    db.relationship('Comment', cascade='all, delete-orphan')
    db.relationship('Like', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "picture": self.picture,
            "caption": self.caption,
            "edited": self.edited
        }