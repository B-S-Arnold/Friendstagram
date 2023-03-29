from app.models import db, Image


def seed_images():
    
    

    
    img1 = Image(
        userId='2', url=' https://cdn.images.express.co.uk/img/dynamic/20/590x/secondary/Matthew-Macfadyen-as-Tom-Wambsgans-2672619.jpg?r=1600388773132', caption='Just hanging out and feeling good on this beautiful day! ☀️ #selfie #goodvibes #enjoyinglife', edited=False)
    
    img2 = Image(
        userId='2', url='https://www.thewrap.com/wp-content/uploads/2019/11/Succession-Greg.png', caption='Watching my man @theOneGregHirsch hold his own on the stand like a pro 🔥💪 #loyalty #justice #teamwork', edited=False)
    
    img3 = Image(
        userId='2', url='https://imageio.forbes.com/blogs-images/carolynlipka/files/2018/08/SUC_110_03132018_CH_1510-1200x800.jpg?format=jpg&width=1200', caption="Walking down the aisle with the love of my life. Shiv, you are my rock and my partner in everything. I am grateful for every moment with you, and I can't wait for our future together. #ForeverTogether #ShivAndTom #LoveWins", edited=False)
    
    img4 = Image(
        userId='2', url='https://external-preview.redd.it/dElg5tIhMWCPeL23hDl6rChoyE2PS4w6BvRhFuAfdV0.png?format=pjpg&auto=webp&s=11b1e7b0d72b43b0e82f8fc272e036859e19d47e', caption="Today, we celebrated the union of two families and the start of a new chapter. Feeling grateful to have these wonderful people by our side, as we embark on this journey together. Here's to love, family, and a lifetime of happiness. #TomAndShivsWedding #FamilyLove #PowerCouple", edited=False)
    
    
    db.session.add_all([img1, img2, img4, img3])
    

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()

# Image seed Template

# img1 = Image(
#         userId='', url="", caption="", edited=False)