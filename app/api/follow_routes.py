from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Follow
from app.forms.follow_form import FollowForm

follow_routes = Blueprint('follows', __name__)
@login_required
@follow_routes.route('/', methods=['GET', 'POST'])
def follows_api():

# POST

    form = FollowForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            follow = Follow(
                userId=current_user.id,
                followedId=form.data['followedId']
            )
            
            db.session.add(follow)
            db.session.commit()
            return follow.to_dict()
    if form.errors:
        return {'errors': form.errors}

# GET

    follows = Follow.query.all()
    return {'follows': [follow.to_dict() for follow in follows]}
    
@follow_routes.route('/<int:id>', methods=['DELETE'])
def follow_del_api(id):
    
        follow = Follow.query.get(id)
    
        db.session.delete(follow)
        db.session.commit()
        return {'message': 'Follow deleted'}