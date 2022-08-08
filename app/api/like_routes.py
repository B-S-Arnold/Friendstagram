from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Like
from app.forms.like_form import LikeForm

like_routes = Blueprint('likes', __name__)
@login_required
@like_routes.route('/', methods=['GET', 'POST'])
def likes_api():

# POST

    form = LikeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            like = Like(
                userId=current_user.id,
                imageId=form.data['imageId']
            )
            
            db.session.add(like)
            db.session.commit()
            return like.to_dict()
    if form.errors:
        return {'errors': form.errors}

# GET

    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}

# @like_routes.route('/<int:id>', methods=['PUT'])
# def comment_api(id):
    
#     comment = Comment.query.get(id)
    
# # PUT
    
#     form = CommentForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
        
#             comment.userId=current_user.id,
#             comment.imageId=form.data['imageId']
#             comment.content=form.data['content'],
#             comment.edited=True

#             db.session.commit()
#             return comment.to_dict()

    # if form.errors:
    #     return {'errors': form.errors}


# DELETE

    
    
@like_routes.route('/<int:id>', methods=['DELETE'])
def like_del_api(id):
    
        like = Like.query.get(id)
    
        db.session.delete(like)
        db.session.commit()
        return {'message': 'Like deleted'}