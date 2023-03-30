from flask_sqlalchemy import SQLAlchemy
from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)
    followedId = db.Column(db.Integer,  db.ForeignKey('users.id'), nullable=False)

    
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "followedId": self.followedId,
        }