from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
from app.forms.image_form import ImageForm


image_routes = Blueprint('images', __name__)
@login_required
@image_routes.route('/', methods=['GET', 'POST'])
def images_api():

    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            image = Image(
                userId=current_user.id,
                picture=form.data['picture'],
                caption=form.data['caption'],
                edited=False
            )
            
            db.session.add(image)
            db.session.commit()
            return image.to_dict()
    if form.errors:
        return {'errors': form.errors}

# GET

    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

