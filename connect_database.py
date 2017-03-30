from peewee import *


class ConnectDatabase:

    def get_connect_string():
        try:
            with open('parameter.txt', "r") as db_name:
                return db_name.readline().strip()
        except:
            print("You need to create a database and store its name in a file named 'parameter.txt'. \
                  For more info, head over to the README")

    db = PostgresqlDatabase(database='d4ekbpq0tu6bop', host='ec2-176-34-113-15.eu-west-1.compute.amazonaws.com',
                            user='kkblxxpiveukqs', port='5432',
                            password='7d0cbbd8417c09332a99e8f92a605c9dd2bf7e782a63e3a837bf0a46ee3f5bf3')
