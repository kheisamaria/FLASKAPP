# import the flask_mysqldb module
from flask_mysqldb import MySQL

# the rest of the imports are the same as before
from flask import Flask, render_template, url_for, flash, redirect
from forms import RegistrationForm, LoginForm

app = Flask(__name__)

# for security reasons, we need to set a secret key
app.config["SECRET_KEY"] = "5791628bb0b13ce0c676dfde280ba245"

# configure the database settings
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = "password"
app.config["MYSQL_DB"] = "flaskblog"

# create a MySQL object
mysql = MySQL(app)

posts = [
    {
        "author": "Corey Schafer",
        "title": "Blog Post 1",
        "content": "First post content",
        "date_posted": "April 20, 2018",
    },
    {
        "author": "Jane Doe",
        "title": "Blog Post 2",
        "content": "Second post content",
        "date_posted": "April 21, 2018",
    },
]


@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html", posts=posts)


@app.route("/about")
def about():
    return render_template("about.html", title="About")


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    # to make sure the form is validated
    if form.validate_on_submit():
        # to display a message to the user
        flash(f"Account created for {form.username.data}!", "success")
        return redirect(url_for("home"))
    return render_template("register.html", title="Register", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    # to make sure the form is validated
    if form.validate_on_submit():
        if form.email.data == "admin@blog.com" and form.password.data == "password":
            # to display a message to the user
            flash("You have been logged in!", "success")
            return redirect(url_for("home"))
        else:
            flash("Login Unsuccessful. Please check username and password", "danger")
    return render_template("login.html", title="Login", form=form)


if __name__ == "__main__":
    app.run(debug=True)
