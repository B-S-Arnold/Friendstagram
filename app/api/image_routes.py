from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)
from app.forms.image_form import ImageForm


image_routes = Blueprint("images", __name__)

# POST IMAGE

@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    
    image = request.files
    
    image = request.files["image"]
       
    caption = request.form["caption"]
   
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        
        print(upload)
        return upload, 400

    url = upload["url"]
    
    new_image = Image(userId=current_user.id, url=url, caption=caption, edited=False)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}

# GET ALL IMAGES

@image_routes.route("")
def get_all_images():
    images = Image.query.order_by(Image.id.desc()).all()
    return {"images": [image.to_dict() for image in images]}

# GET IMAGE BY USERID

# EDIT IMAGE (CAPTION)

@image_routes.route('/<int:id>', methods=['PUT'])
def image_api(id):
    image = Image.query.get(id)
    # caption = request.form["caption"]
    
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # if image.url:
    if form.validate_on_submit():
        
            
            # image.caption=caption,
            # image.edited=True
            image.caption=form.data['caption'],
            image.edited=True

            db.session.commit()
            return image.to_dict()
        
    if form.errors:
            return {'errors': form.errors}
    
# # PUT
    
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
        
#             image.userId=current_user.id,
#             image.url=form.data['url']
#             image.caption=form.data['caption'],
#             image.edited=True

#             db.session.commit()
#             return image.to_dict()
        
#     if form.errors:
#         return {'errors': form.errors}
        
    
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
        
#             image.userId=current_user.id,
#             image.url=form.data['url']
#             image.caption=form.data['caption'],
#             image.edited=True

#             db.session.commit()
#             return image.to_dict()
        
#     if form.errors:
#         return {'errors': form.errors}
        

# DELETE IMAGE

@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    

        image = Image.query.get(id)
        
        url_arr = image.url.split("/")
        key = url_arr[len(url_arr)-1]
        
        delete = delete_file_from_s3(key)
        if delete == False:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            print(delete)
            return delete, 400
    
        
        db.session.delete(image)
        db.session.commit()
        return {"Image Deleted": [image.to_dict()]}

# from flask import Blueprint, request
# from flask_login import login_required, current_user
# from app.models import db, Image
# from app.forms.image_form import ImageForm


# image_routes = Blueprint('images', __name__)
# @login_required
# @image_routes.route('/', methods=['GET', 'POST'])
# def images_api():

# # POST

#     form = ImageForm()

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#             image = Image(
#                 userId=current_user.id,
#                 url=form.data['url'],
#                 caption=form.data['caption'],
#                 edited=False
#             )
            
#             db.session.add(image)
#             db.session.commit()
#             return image.to_dict()
#     if form.errors:
#         return {'errors': form.errors}

# # GET

#     images = Image.query.all()
#     return {'images': [image.to_dict() for image in images]}

# @image_routes.route('/<int:id>', methods=['PUT'])
# def image_api(id):
    
#     image = Image.query.get(id)
    
# # PUT
    
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
        
#             image.userId=current_user.id,
#             image.url=form.data['url']
#             image.caption=form.data['caption'],
#             image.edited=True

#             db.session.commit()
#             return image.to_dict()
        
#     if form.errors:
#         return {'errors': form.errors}

# @image_routes.route('/<int:id>', methods=['DELETE'])
# def image_del_api(id):

# # DELETE

#         image = Image.query.get(id)
    
#         db.session.delete(image)
#         db.session.commit()
#         return {'message': 'Image deleted'}

    