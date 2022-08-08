from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class LikeForm(FlaskForm):
    
    imageId = IntegerField('ImageId', validators=[DataRequired()])
    submit = SubmitField('Submit')