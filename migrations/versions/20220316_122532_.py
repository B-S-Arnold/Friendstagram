"""empty message

Revision ID: 628b9824ce5c
Revises: ffdc0a98111c
Create Date: 2022-03-16 12:25:32.772230

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '628b9824ce5c'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('picture', sa.String(), nullable=False),
    sa.Column('caption', sa.Text(), nullable=True),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('imageId', sa.Integer(), nullable=False),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('edited', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['imageId'], ['images.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('imageId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['imageId'], ['images.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('images')
    # ### end Alembic commands ###
