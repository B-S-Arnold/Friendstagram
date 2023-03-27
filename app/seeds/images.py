from app.models import db, Image


def seed_images():
    image1 = Image(
        userId='2', url='', caption='')
        
def undo_images():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()