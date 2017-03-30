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


# class User(BaseModel):
#     username = CharField()
#     password = CharField()


class Common(BaseModel):
    description = CharField()
    position = CharField()


class Board(Common):
    title = CharField()
    date = DateField()
    # card = ForeignKeyField(Card, null=True)

class Card(Common):
    status = CharField()
    board = ForeignKeyField(Board)