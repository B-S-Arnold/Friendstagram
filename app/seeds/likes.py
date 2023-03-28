from app.models import db, Like


def seed_likes():
    
    like1 = Like(
        userId='2', imageId=1)
    
    like2 = Like(
        userId='2', imageId=2)
    
    like3 = Like(
        userId='3', imageId=1)
    
    db.session.add_all([like1, like2, like3])
   
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()