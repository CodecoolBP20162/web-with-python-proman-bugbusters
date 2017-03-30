from models import *
from collections import OrderedDict
import peewee


class DataGetter:

    def __init__(self):
        self.board = Board.select().order_by(Board.position.asc())
        self.card = Card.select()
        self.all_data = OrderedDict()

    def run(self):
        for b in self.board:
            self.all_data['board' + str(b.id)] = {'id': b.id, 'title': b.title, "description": b.description,
                                                  "timestamp": str(b.date), "position": b.position, 'cards': []}
        for c in self.card:
            temp_dict = {'status': c.status, 'position': c.position, 'description': c.description, 'id': c.id}
            self.all_data['board' + str(c.board.id)]['cards'].append(temp_dict)
        return self.all_data


class DataUpdater:

    def __init__(self, dictionary):
        self.dictionary = dictionary
        self.boards = Board.select().where(Board.id == self.dictionary['id'])
        self.cards = Card.select().where(Card.id == self.dictionary['id'])

    def run(self):
        if self.dictionary['config'] == 'card':
            self.modify_card()
        elif self.dictionary['config'] == 'board':
            self.modify_board()

    def modify_card(self):
        for card in self.cards:
            if 'description' in self.dictionary:
                card.description = self.dictionary['description']
                card.save()
            if 'status' in self.dictionary:
                card.status = self.dictionary['status']
                card.save()
            if 'position' in self.dictionary:
                card.position = self.dictionary['position']
                card.save()

    def modify_board(self):
        for board in self.boards:
            board.position = self.dictionary['position']
            board.save()
