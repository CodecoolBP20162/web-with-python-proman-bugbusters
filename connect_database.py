from peewee import *


class ConnectDatabase:

    db = PostgresqlDatabase(database='d4ekbpq0tu6bop', host='ec2-176-34-113-15.eu-west-1.compute.amazonaws.com',
                            user='kkblxxpiveukqs', port='5432',
                            password='7d0cbbd8417c09332a99e8f92a605c9dd2bf7e782a63e3a837bf0a46ee3f5bf3')
