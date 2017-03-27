from connect_database import *
from peewee import *
from datetime import date


class BaseModel(Model):
    """A base model that will use our Postgresql database"""

    class Meta:
        database = ConnectDatabase.db


class User(BaseModel):
    username = CharField()
    password = CharField()


class Common(BaseModel):
    title = CharField()
    description = CharField()
    date = DateField()
    position = CharField()


class Board(Common):
    user = ForeignKeyField(User)


class Card(Common):
    board = ForeignKeyField(Board)
    status = CharField()
