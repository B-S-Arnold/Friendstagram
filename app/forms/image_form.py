from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    picture = StringField('Picture', validators=[DataRequired()])
    caption = TextAreaField('Caption')
    submit = SubmitField('Submit')
   