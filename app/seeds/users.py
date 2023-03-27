from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo_user', email='demo@aa.io', password='password', fullName='Demo User')
    tom = User(
        username='iLoveMyWife25', email='tomwambsgams@aa.io', password='password', fullName='Tom Wambsgams', url='https://media.gq.com/photos/5da61bb0b2ccb20008b494be/4:3/w_2551,h_1913,c_limit/tv-succession-matthew-macfadyen-tom-wambsgans-gq-october-101519.jpg', bio='Loyal servant to the Roy family, strategic advisor, and aspiring mogul. Helping run the media empire and trying to keep up with the demands of high society. Follow me for behind-the-scenes insights on the business and the glamour. #RoyFamily #MediaMogul #NYCLife')
    greg = User(
        username='theOneGregHirsch', email='greghirsch@aa.io', password='password', fullName='Greg Hirsch', url='https://pbs.twimg.com/profile_images/1482796274621374467/Q7dsAndm_400x400.jpg', bio='Official account of Greg Hirsch 📈🤑 Aspiring mogul and all-around chiller. Living life one awkward moment at a time. Catch me at Waystar Royco, making moves and learning the ropes.')
    peggy = User(
        username='peggyhill54', email='margarethill@aa.io', password='password', fullName='Margaret Hill', url='https://www.giantbomb.com/a/uploads/scale_small/0/7383/1813631-peggy_hill.jpg')
    bart = User(
        username='elbarto', email='bartman@aa.io', password='password', fullName='El Barto', url='https://e1.pxfuel.com/desktop-wallpaper/591/300/desktop-wallpaper-bartsimpson-el-barto.jpg')
    carl = User(
        username='2cool4U', email='carl@aa.io', password='password', fullName='Carl Brutananadilewski', url='https://i.cdn.turner.com/asfix/repository//8a25c39212c8bcf30112c99af0910001/thumbnail_63404.jpg')
    butters = User(
        username='butters_chaos', email='theprofessorchaos@aa.io', password='password', fullName='Leopold Stotch', url='https://i.pinimg.com/736x/e4/a6/97/e4a697c1104b43f9f558cfbf5aec0a82.jpg')
    joey = User(
        username='joeytribbiani', email='joeytribbiani@friends.com', password='password', fullName='Joey Tribbiani', url='https://i.guim.co.uk/img/media/ae14333615408ab5d5ba6c23810be683e0d6f631/389_282_1481_889/master/1481.jpg?width=1200&quality=85&auto=format&fit=max&s=bd2289ab125e182d2219c06f34174943')
    carrie = User(
        username='carriebradshaw', email='carriebradshaw@sexandthecity.com', password='password', fullName='Carrie Bradshaw', url='https://www.cheatsheet.com/wp-content/uploads/2019/07/SJP.jpg?w=747&h=1024')
    don = User(
        username='don_draper', email='don_draper@sterlingcooper.com', password='password', fullName='Don Draper', url='https://www.literarytraveler.com/wp-content/uploads/2015/04/Don-Draper-Pic.jpg')
    leslie = User(
        username='leslieknope', email='leslieknope@pawnee.gov', password='password', fullName='Leslie Knope', url='https://assets1.cbsnewsstatic.com/hub/i/2016/11/10/b6412961-dae0-4ee8-901a-75c6c66be11c/leslie-knope.jpg')
    tyler = User(
        username='tylerdurden', email='tylerdurden@fightclub.com', password='password', fullName='Tyler Durden', url='https://i.pinimg.com/474x/68/0c/38/680c38bb6b84e7d14638abab6cb05442.jpg')
    liz = User(
        username='lizlemon', email='lizlemon@30rock.com', password='password', fullName='Liz Lemon', url='https://tv-fanatic-res.cloudinary.com/iu/s--0QT9_jU0--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1371145164/liz-lemon.png')
    michael = User(
        username='michaelscott', email='michaelscott@dundermifflin.com', password='password', fullName='Michael Scott', url='https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png')
    daria = User(
        username='dariamorgendorffer', email='dariamorgendorffer@lawndalehigh.com', password='password', fullName='Daria Morgendorffer', url='https://img.buzzfeed.com/buzzfeed-static/static/2022-02/8/12/asset/0bd92bb09cf4/anigif_sub-buzz-3890-1644323336-4_preview.gif?crop=385:300;6,0&resize=990:*&output-quality=auto&output-format=auto&downsize=360:*')
    ron = User(
        username='ronswanson', email='ronswanson@pawnee.gov', password='password', fullName='Ron Swanson', url='https://www.hollywoodreporter.com/wp-content/uploads/2011/07/nick_offermannbc_a_p.jpg')
    chandler = User(
        username='chandlerbing', email='chandlerbing@friends.com', password='password', fullName='Chandler Bing', url='https://media1.popsugar-assets.com/files/thumbor/wdoni8-dpP0HaqX4sYfe_RWGUVg/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/10/06/806/n/1922283/5d84a4af57f69609b26c99.07034779_edit_img_image_35947698_1468270800/i/Chandler-Bing-Lines-From-Friends-GIFs.jpg')
    

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
