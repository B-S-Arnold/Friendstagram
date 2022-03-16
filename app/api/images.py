from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Image
from app.forms.image_form import ImageForm


image_routes = Blueprint('images', __name__)

@image_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_and_add_images():

    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            image = Image(
                picture=form.data['picture'],
                caption=form.data['caption'],
                userId=current_user.id,
            )

            db.session.add(image)
            db.session.commit()
            return image.to_dict()
    if form.errors:
        return {'errors': form.errors}

    images = Image.query.all()
    return {'images': [image.to_dict() for image in images]}

# @image_routes.route('/', methods=['GET'])
# @login_required
# def dev_reviews(id):
#     reviews = Image.query.filter(Review.developerId == id).join(User, User.id == Review.userId).add_columns(Review.id, Review.body, Review.rating, Review.developerId, Review.userId, User.username).all()
#     return {"reviews": [{"id": review.id, "body": review.body, "rating": review.rating, "developerId": review.developerId,"username": review.username, "userId": review.userId} for review in reviews]}

# @review_routes.route('/', methods=['POST'])
# @login_required
# def reviews_api(id):
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         review = Image(
#             body=form.data['body'],
#             userId=current_user.id,
#             developerId=id,
#             rating=form.data['rating']
#         )
#         db.session.add(review)
#         db.session.commit()
#         newReview = Review.query.filter(review.id == Review.id).join(User, User.id == Review.userId).add_columns(Review.id, Review.body, Review.rating, Review.developerId, Review.userId, User.username).first()
#         return {"id": newReview.id, "body": newReview.body, "rating": newReview.rating, "developerId": newReview.developerId,"username": newReview.username, "userId": newReview.userId}
#     elif form.errors:
#         return {"errors": form.errors}