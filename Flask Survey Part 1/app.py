from flask import Flask, render_template, request, redirect, flash
# from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)

# the toolbar is only enabled in debug mode:
# app.debug = False

# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = '<1234>'

# toolbar = DebugToolbarExtension(app)

responses = []

@app.route("/")
def show_survey_start():
    '''starting page'''
    return render_template("survey_start.html", survey=survey)

@app.route("/begin", methods="POST")
def start_survey():
    '''starting the survey'''

    # responses = []
    return redirect("/questions/0")

@app.route("/question/<int:qid>")
def show_question(qid):
    ''' display the current question'''
    if (responses is None):
        # trying to access question page too soon
        return redirect("/")

    if (len(responses) == len(survey.questions)):
        # They've answered all the questions
        return redirect("/complete")

    if (len(responses) != qid):
        # Trying to access questions out of order.
        flash(f"Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")
    
    question = survey.questions[qid]
    return render_template("questions.html", question_num=qid, question=question)
    

@app.route("/answer", methods=["POST"])
def handle_answers():
    '''handle answers and route'''

    # response choice
    choice = request.form['answer']

    responses.append(choice)
    if (len(responses) == len(survey.questions)):
        # They've answered all the questions
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")
    
@app.route("/complete")
def complete():
    '''final page'''
    return render_template("final.html")
