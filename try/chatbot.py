from Reddit_ChatBot_Python import RedditAuthentication, ChatBot


from dotenv import dotenv_values


env = dotenv_values(".env")


reddit_authentication = RedditAuthentication.PasswordAuth(
    reddit_username=env['USERNAME'],
    reddit_password=env['PASSWORD']
)

chatbot = ChatBot(print_chat=True,
                  store_session=True,
                  log_websocket_frames=False,
                  authentication=reddit_authentication,
                  global_blacklist_words={"badword1", "badword2"}
                  )





# @chatbot.event.on_ready
# def report_channels(_):
#     print("up and running in these channels!: ")
#     channels = chatbot.get_channels()
#     for channel in channels:
#         print(channel.name)


@chatbot.event.on_ready
def start():
    print("me ready")

# and finally, run forever...
chatbot.run_4ever(auto_reconnect=True)
