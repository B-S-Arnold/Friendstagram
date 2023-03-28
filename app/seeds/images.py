from app.models import db, Image


def seed_images():
    
    img1 = Image(
        userId='2', url=' https://cdn.images.express.co.uk/img/dynamic/20/590x/secondary/Matthew-Macfadyen-as-Tom-Wambsgans-2672619.jpg?r=1600388773132', caption='Just hanging out and feeling good on this beautiful day! ☀️ #selfie #goodvibes #enjoyinglife', edited=False)
    
    img2 = Image(
        userId='2', url='https://www.thewrap.com/wp-content/uploads/2019/11/Succession-Greg.png', caption='Watching my man @theOneGregHirsch hold his own on the stand like a pro 🔥💪 #loyalty #justice #teamwork', edited=False)
    
    db.session.add(img1)
    db.session.add(img2)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
