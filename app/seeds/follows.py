from app.models import db, Follow


def seed_follows():
    
    follow_seeds = []
    
    for i in range(2,7):
        follow_seeds.append(Follow(userId=1, followedId=str(i)))
    
    for i in range(2, 24):
        for j in range(1, 24):
            if i != j:
                follow_seeds.append(Follow(userId=str(i), followedId=str(j)))
                
    db.session.add_all(follow_seeds)
   
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()