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
    joey = User(
        username='joeytribbiani', email='joeytribbiani@friends.com', password='password', fullName='Joey Tribbiani', url='https://www.nme.com/wp-content/uploads/2021/09/GettyImages-71522561.jpg')
    carrie = User(
        username='carriebradshaw', email='carriebradshaw@sexandthecity.com', password='password', fullName='Carrie Bradshaw', url='https://images.hellogiggles.com/uploads/2020/06/03132617/Carrie-Bradshaw-Header.jpg')
    don = User(
        username='don_draper', email='don_draper@sterlingcooper.com', password='password', fullName='Don Draper', url='https://www.telegraph.co.uk/content/dam/tv/2017/05/17/Don-Draper_trans_NvBQzQNjv4BqrWYeUU_H0zBKyvljOo6zlkYMapKPjdhyLnv9ax6_too.jpg?imwidth=450')
    leslie = User(
        username='leslieknope', email='leslieknope@pawnee.gov', password='password', fullName='Leslie Knope', url='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leslie-knope-parks-and-rec-1615968227.png')
    tyler = User(
        username='tylerdurden', email='tylerdurden@fightclub.com', password='password', fullName='Tyler Durden', url='https://www.indiewire.com/wp-content/uploads/2019/09/fight-club-brad-pitt.jpg')
    liz = User(
        username='lizlemon', email='lizlemon@30rock.com', password='password', fullName='Liz Lemon', url='https://www.indiewire.com/wp-content/uploads/2020/06/liz-lemon-30-rock.jpg')
    michael = User(
        username='michaelscott', email='michaelscott@dundermifflin.com', password='password', fullName='Michael Scott', url='https://www.indiewire.com/wp-content/uploads/2020/06/the-office-michael-scott.jpg')
    daria = User(
        username='dariamorgendorffer', email='dariamorgendorffer@lawndalehigh.com', password='password', fullName='Daria Morgendorffer', url='https://www.indiewire.com/wp-content/uploads/2020/06/daria.jpg')
    ron = User(
        username='ronswanson', email='ronswanson@pawnee.gov', password='password', fullName='Ron Swanson', url='https://www.indiewire.com/wp-content/uploads/2020/06/ron-swanson.jpg')
    chandler = User(
        username='chandlerbing', email='chandlerbing@friends.com', password='password', fullName='Chandler Bing', url='https://static.wikia.nocookie.net/friends/images/f/f3/Square_Chandler.png/revision/latest?cb=20190819093643')
    

    db.session.add(demo)
    db.session.add(tom)
    db.session.add(greg)
    db.session.add(peggy)
    db.session.add(peggy)
    db.session.add(joey)
    db.session.add(carrie)
    db.session.add(don)
    db.session.add(leslie)
    db.session.add(tyler)
    db.session.add(liz)
    db.session.add(michael)
    db.session.add(daria)
    db.session.add(ron)
    db.session.add(chandler)
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
