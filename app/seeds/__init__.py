from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .likes import seed_likes, undo_likes
from .comments import seed_comments, undo_comments
from .follows import seed_follows, undo_follows
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users(),
    seed_images(),
    seed_likes(),
    seed_comments(),
    seed_follows()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users(),
    undo_images(),
    undo_likes(),
    undo_comments(),
    undo_follows()
    # Add other undo functions here
