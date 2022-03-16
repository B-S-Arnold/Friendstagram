from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    picture = StringField('picture', validators=[DataRequired()])
    caption = TextAreaField('caption')
   