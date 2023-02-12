from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo_user', email='demo@aa.io', password='password', fullName='Demo User')
    peggy = User(
        username='peggyhill54', email='margarethill@aa.io', password='password', fullName='Margaret Hill')
    bart = User(
        username='elbarto', email='bartman@aa.io', password='password', fullName='El Barto')
    carl = User(
        username='2cool4U', email='carl@aa.io', password='password', fullName='Carl Brutananadilewski')
    butters = User(
        username='butters_chaos', email='theprofessorchaos@aa.io', password='password', fullName='Leopold Stotch', url='https://i.pinimg.com/736x/e4/a6/97/e4a697c1104b43f9f558cfbf5aec0a82.jpg')
    

    db.session.add(demo)
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
