from app.models import db, Comment


def seed_comments():
    
    comment1 = Comment(
        userId='3', imageId=2, content="I'd really appreciate it if you could take this down - I don't want that kind of attention right now. Thanks for understanding, man. - Greg", edited=False)
    
    comment2 = Comment(
        userId='2', imageId=2, content="Hey Greg, I understand your concerns, but I don't think taking down the photo is the right move. It's important for our followers to see the behind-the-scenes of the media empire, and that includes the legal battles we face. Plus, the photo is already out there - taking it down now might draw even more attention to it. I hope you can understand where I'm coming from.", edited=False)
    
    comment3 = Comment(
        userId='3', imageId=2, content="I guess that makes sense.", edited=False)
    
    comment4 = Comment(
        userId='3', imageId=3, content="Lookin good!", edited=False)
    
    comment5 = Comment(
        userId='2', imageId=3, content="You would say that.", edited=False)
    
    db.session.add_all([comment1, comment2, comment3, comment4, comment5])
   
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
    
    # Comment seed template
    
    # comment1 = Comment(
    #     userId='', imageId=1, content="", edited=False)