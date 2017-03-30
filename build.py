from models import *
from datetime import date
import datetime


class Build():

    @staticmethod
    def generate_data():
        # Generate boards
        board_list = [["Board1", "This is the first board!", '3/30/2017, 12:11:59 PM', 1],
                      ["Board2", "This is the second board!", '3/31/2017, 12:11:59 PM', 2],
                      ["Board3", "This is the third board!", '2/20/2017, 12:11:59 PM', 3],
                      ["Board4", "This is the fourth board!", '1/10/2017, 12:11:59 PM', 4]]

        for i in range(len(board_list)):
            Board.create(title=board_list[i][0],
                         description=board_list[i][1],
                         date=board_list[i][2],
                         position=board_list[i][3])

        # Generate cards
        card_list = [["This is the first card!", 1, "new", 1],
                     ["This is the second card!",  2, "new", 1],
                     ["This is the third card!",  1, "planning", 1],
                     ["This is the fourth card!", 2, "planning", 2],
                     ["This is the fifth card!",  1, "in-progress", 2],
                     ["This is the sixth card!",  2, "in-progress", 2],
                     ["This is the seventh card!",  1, "done", 3],
                     ["This is the eightth card!", 2, "done", 3]]

        for i in range(len(card_list)):
            Card.create(
                description=card_list[i][0],
                position=card_list[i][1],
                status=card_list[i][2],
                board=card_list[i][3])
