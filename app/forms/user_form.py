# from flask_wtf import FlaskForm
# from wtforms import TextAreaField, StringField, SubmitField
# from wtforms.validators import DataRequired
# from werkzeug.security import generate_password_hash, check_password_hash

# class UserForm(FlaskForm):
    
#     username = StringField('Username')
#     email = StringField('Email')
#     hashed_password = StringField('HashedPassword')
#     fullName = StringField('FullName')
#     url = StringField('Url')
#     bio = TextAreaField('Bio')
#     submit = SubmitField('Submit')
   
#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)
   
