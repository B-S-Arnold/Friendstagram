from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms.comment_form import CommentForm


comment_routes = Blueprint('comments', __name__)
@login_required
@comment_routes.route('/', methods=['GET', 'POST'])
def comments_api():

# POST

    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            comment = Comment(
                userId=current_user.id,
                imageId=form.data['imageId'],
                content=form.data['content'],
                edited=False
            )
            
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
    if form.errors:
        return {'errors': form.errors}

# GET

    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
def comment_api(id):
    
    comment = Comment.query.get(id)
    
# PUT
    
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
            comment.userId=current_user.id,
            comment.imageId=form.data['imageId']
            comment.content=form.data['content'],
            comment.edited=True

            db.session.commit()
            return comment.to_dict()

# DELETE

    if not form.data['content']:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted'}

    if form.errors:
        return {'errors': form.errors}