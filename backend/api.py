from src import init_app

app = init_app()

if __name__ == '__main__':
    app.run(debug=True, port=3001, use_reloader=True)