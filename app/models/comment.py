from flask_sqlalchemy import SQLAlchemy
from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    imageId = db.Column(db.Integer,  db.ForeignKey('images.id', ondelete='CASCADE'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    edited = db.Column(db.Boolean)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "imageId": self.imageId,
            "content": self.content,
            "edited": self.edited
        }