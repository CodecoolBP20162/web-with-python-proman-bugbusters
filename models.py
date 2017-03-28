from connect_database import *
from peewee import *
from datetime import date


class BaseModel(Model):
    """A base model that will use our Postgresql database"""

    def __str__(self):
        r = {}
        for k in self._data.keys():
            try:
                r[k] = str(getattr(self, k))
            except:
                r[k] = json.dumps(getattr(self, k))
        return str(r)

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
