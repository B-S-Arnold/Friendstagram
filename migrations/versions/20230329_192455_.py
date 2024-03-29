"""empty message

Revision ID: 1994b5691f72
Revises: 549f2b1464ca
Create Date: 2023-03-29 19:24:55.830513

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1994b5691f72'
down_revision = '549f2b1464ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('follows',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('followedId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followedId'], ['users.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('follows')
    # ### end Alembic commands ###
