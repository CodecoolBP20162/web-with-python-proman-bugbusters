from models import *
from datetime import date
import datetime


class Build():

    @staticmethod
    def generate_data():
        # Generate users
        user_list = [["david", "12345"], ["matyi", "12345"], ["anna", "12345"], ["pisti", "12345"]]

        for i in range(len(user_list)):
            User.create(username=user_list[i][0], password=user_list[i][1])

        # Generate boards
        board_list = [["Board1", "This is the first board!", datetime.datetime(2017, 3, 27, 9, 0), 1, 1],
                      ["Board2", "This is the second board!", datetime.datetime(2017, 3, 27, 10, 0), 2, 1],
                      ["Board3", "This is the third board!", datetime.datetime(2017, 3, 27, 11, 0), 3, 1],
                      ["Board4", "This is the fourth board!", datetime.datetime(2017, 3, 27, 12, 0), 4, 1]]

        for i in range(len(board_list)):
            Board.create(title=board_list[i][0],
                         description=board_list[i][1],
                         date=board_list[i][2],
                         position=board_list[i][3],
                         user=board_list[i][4])

        # Generate cards
        card_list = [["Card1", "This is the first card!", datetime.datetime(2017, 3, 27, 9, 0), 1, 1, "New"],
                     ["Card2", "This is the second card!", datetime.datetime(2017, 3, 27, 10, 0), 2, 1, "New"],
                     ["Card3", "This is the third card!", datetime.datetime(2017, 3, 27, 11, 0), 1, 1, "Planning"],
                     ["Card4", "This is the fourth card!", datetime.datetime(2017, 3, 27, 12, 0), 2, 1, "Planning"],
                     ["Card5", "This is the fifth card!", datetime.datetime(2017, 3, 27, 13, 0), 1, 1, "In progress"],
                     ["Card6", "This is the sixth card!", datetime.datetime(2017, 3, 27, 14, 0), 2, 1, "In progress"],
                     ["Card7", "This is the seventh card!", datetime.datetime(2017, 3, 27, 15, 0), 1, 1, "Done"],
                     ["Card8", "This is the eightth card!", datetime.datetime(2017, 3, 27, 16, 0), 2, 1, "Done"]]

        for i in range(len(card_list)):
            Card.create(title=card_list[i][0],
                        description=card_list[i][1],
                        date=card_list[i][2],
                        position=card_list[i][3],
                        board=card_list[i][4],
                        status=card_list[i][5])
