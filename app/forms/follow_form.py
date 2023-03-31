from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class FollowForm(FlaskForm):
    
    followedId = IntegerField('FollowedId', validators=[DataRequired()])
    submit = SubmitField('Submit')