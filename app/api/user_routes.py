from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy import null
from app.models import db, User
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<username>')
@login_required
def user(username):
    # print("USERNAME", username)
    user = User.query.filter(User.username == username).first()
    print("USERNAME", username)
    print("THISUSER", user)
    return user.to_dict()

@user_routes.route("/<int:id>", methods=["PUT"])
@login_required
def change_pic(id):
    user = User.query.get(id)
    
    if user.url:
        url_arr = user.url.split("/")
        key = url_arr[len(url_arr)-1]
        
        delete = delete_file_from_s3(key)
        if delete == False:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            print(delete)
            return delete, 400
    
    
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    
    image = request.files
    
    image = request.files["image"]
       
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        
        print(upload)
        return upload, 400

    url = upload["url"]
    
    user.url = url
    
    db.session.commit()
    return {"url": url}

@user_routes.route("/del/<int:id>", methods=["PUT"])
@login_required
def rem_pic(id):
    user = User.query.get(id)
    
    if user.url:
        url_arr = user.url.split("/")
        key = url_arr[len(url_arr)-1]
        
        delete = delete_file_from_s3(key)
        if delete == False:
            # if the dictionary doesn't have a filename key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            print(delete)
            return delete, 400
    
    
    user.url = None

    db.session.commit()
    return {"Profile Pic Deleted": "deleted"}
