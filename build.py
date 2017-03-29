from models import *
from datetime import date
import datetime


class Build():

    @staticmethod
    def generate_data():
        # Generate users
        # user_list = [["david", "12345"], ["matyi", "12345"], ["anna", "12345"], ["pisti", "12345"]]

        # for i in range(len(user_list)):
        #     User.create(username=user_list[i][0], password=user_list[i][1])

        # Generate boards
        board_list = [["Board1", "This is the first board!", datetime.datetime(2017, 3, 27, 9, 0), 1,],
                      ["Board2", "This is the second board!", datetime.datetime(2017, 3, 27, 10, 0), 2,],
                      ["Board3", "This is the third board!", datetime.datetime(2017, 3, 27, 11, 0), 3,],
                      ["Board4", "This is the fourth board!", datetime.datetime(2017, 3, 27, 12, 0), 4,]]

        for i in range(len(board_list)):
            Board.create(title=board_list[i][0],
                         description=board_list[i][1],
                         date=board_list[i][2],
                         position=board_list[i][3])

        # Generate cards
        card_list = [["This is the first card!", 1, "New", 1],
                     ["This is the second card!",  2, "New", 1],
                     ["This is the third card!",  1, "Planning", 1],
                     ["This is the fourth card!", 2, "Planning", 2],
                     ["This is the fifth card!",  1, "In progress", 2],
                     ["This is the sixth card!",  2, "In progress", 2],
                     ["This is the seventh card!",  1, "Done", 3],
                     ["This is the eightth card!", 2, "Done", 3]]

        for i in range(len(card_list)):
            Card.create(
                description=card_list[i][0],
                position=card_list[i][1],
                status=card_list[i][2],
                board = card_list[i][3])
