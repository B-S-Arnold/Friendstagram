from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo_user', email='demo@aa.io', password='password', fullName='Demo User')
    tom = User(
        username='iLoveMyWife25', email='tomwambsgams@aa.io', password='password', fullName='Tom Wambsgams', url='https://media.gq.com/photos/5da61bb0b2ccb20008b494be/4:3/w_2551,h_1913,c_limit/tv-succession-matthew-macfadyen-tom-wambsgans-gq-october-101519.jpg')
    greg = User(
        username='theOneGregHirsch', email='greghirsch@aa.io', password='password', fullName='Greg Hirsch', url='https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_41/1788465/cousin-greg-kb-inline-5-211015.jpg')
    peggy = User(
        username='peggyhill54', email='margarethill@aa.io', password='password', fullName='Margaret Hill', url='https://www.giantbomb.com/a/uploads/scale_small/0/7383/1813631-peggy_hill.jpg')
    bart = User(
        username='elbarto', email='bartman@aa.io', password='password', fullName='El Barto', url='https://e1.pxfuel.com/desktop-wallpaper/591/300/desktop-wallpaper-bartsimpson-el-barto.jpg')
    carl = User(
        username='2cool4U', email='carl@aa.io', password='password', fullName='Carl Brutananadilewski', url='https://i.cdn.turner.com/asfix/repository//8a25c39212c8bcf30112c99af0910001/thumbnail_63404.jpg')
    butters = User(
        username='butters_chaos', email='theprofessorchaos@aa.io', password='password', fullName='Leopold Stotch', url='https://i.pinimg.com/736x/e4/a6/97/e4a697c1104b43f9f558cfbf5aec0a82.jpg')
    
    

    db.session.add(demo)
    db.session.add(tom)
    db.session.add(greg)
    db.session.add(peggy)
    db.session.add(bart)
    db.session.add(carl)
    db.session.add(butters)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
