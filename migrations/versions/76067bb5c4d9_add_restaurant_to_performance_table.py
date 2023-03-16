"""Add restaurant to performance table

Revision ID: 76067bb5c4d9
Revises: 
Create Date: 2023-03-14 12:20:40.402333

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76067bb5c4d9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performance', schema=None) as batch_op:
        batch_op.add_column(sa.Column('restaurant', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('performance', schema=None) as batch_op:
        batch_op.drop_column('restaurant')

    # ### end Alembic commands ###