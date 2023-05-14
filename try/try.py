import praw
from dotenv import dotenv_values


env = dotenv_values(".env")

# print(env)

reddit = praw.Reddit(
    client_id=env['CLIENTID'],
    client_secret=env['CLIENTSECRET'],
    user_agent="ASB",
    username=env['USERNAME'],
    password=env['PASSWORD'],
)


# reddit.redditor("wenxuan27").message("TEST", "tester", from_subreddit="testsub")
reddit.redditor("wenxuan27").message("TEST", "tester")