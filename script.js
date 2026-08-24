const quizData = [
{
category:"🎬 Movies",
question:"Which film won the Academy Award for Best Picture in 1998?",
answers:["Titanic","Good Will Hunting","L.A. Confidential","The Full Monty"],
correct:0
},
{
category:"📺 TV",
question:"What is the name of the paper company in The Office (US)?",
answers:["Sabre","Dunder Mifflin","Wernham Hogg","Staples"],
correct:1
},
{
category:"🎬 Movies",
question:"Who directed Pulp Fiction?",
answers:["Martin Scorsese","Steven Spielberg","Quentin Tarantino","Guy Ritchie"],
correct:2
},
{
category:"📺 TV",
question:"In Breaking Bad, what is the street name of Walter White's blue meth?",
answers:["Crystal Blue","Blue Sky","Azure Ice","Heisenberg Blue"],
correct:1
},
{
category:"🎬 Movies",
question:"What is the name of the kingdom in Frozen?",
answers:["Arendelle","Corona","DunBroch","Avalor"],
correct:0
},
{
category:"📺 TV",
question:"Which sitcom features the character Barney Stinson?",
answers:["Friends","New Girl","How I Met Your Mother","Brooklyn Nine-Nine"],
correct:2
},
{
category:"🎬 Movies",
question:"Who played Maximus in Gladiator?",
answers:["Russell Crowe","Hugh Jackman","Gerard Butler","Joaquin Phoenix"],
correct:0
},
{
category:"📺 TV",
question:"What is Eleven's favourite food in Stranger Things?",
answers:["Pizza","Eggos","Burgers","Pancakes"],
correct:1
},
{
category:"🎬 Movies",
question:"Which movie features the quote 'Why so serious?'",
answers:["Joker","The Dark Knight","Batman Begins","Suicide Squad"],
correct:1
},
{
category:"📺 TV",
question:"In Game of Thrones, what is the motto of House Stark?",
answers:["Fire and Blood","Winter is Coming","Hear Me Roar","Unbowed, Unbent, Unbroken"],
correct:1
},
{
category:"🎬 Movies",
question:"Which actor voices Woody in Toy Story?",
answers:["Tom Hanks","Tim Allen","Billy Crystal","Robin Williams"],
correct:0
},
{
category:"📺 TV",
question:"What is the name of the pub in How I Met Your Mother?",
answers:["Moe's Tavern","MacLaren's Pub","Central Perk","Paddy's Pub"],
correct:1
},
{
category:"🎬 Movies",
question:"In The Matrix, what colour pill does Neo take?",
answers:["Blue","Green","Yellow","Red"],
correct:3
},
{
category:"📺 TV",
question:"Which actor played Chandler Bing in Friends?",
answers:["Matt LeBlanc","David Schwimmer","Matthew Perry","Matthew Broderick"],
correct:2
},
{
category:"🎬 Movies",
question:"Who played Jack Sparrow in Pirates of the Caribbean?",
answers:["Orlando Bloom","Johnny Depp","Geoffrey Rush","Colin Farrell"],
correct:1
},
{
category:"📺 TV",
question:"What is the name of the school in Sex Education?",
answers:["Woodland High","Moordale Secondary","Hill Valley High","Greendale"],
correct:1
},
{
category:"🎬 Movies",
question:"Which 1994 film stars Tom Hanks recounting his life from a park bench?",
answers:["Apollo 13","Philadelphia","Forrest Gump","Big"],
correct:2
},
{
category:"📺 TV",
question:"In The Simpsons, what is the name of Bart's teacher?",
answers:["Edna Krabappel","Elizabeth Hoover","Seymour Skinner","Patty Bouvier"],
correct:0
},
{
category:"🎬 Movies",
question:"What is the highest-grossing film worldwide?",
answers:["Titanic","Avatar","Avengers Endgame","The Force Awakens"],
correct:1
},
{
category:"📺 TV",
question:"Which comedy follows employees of the Pawnee Parks Department?",
answers:["Community","The Good Place","Parks and Recreation","Superstore"],
correct:2
}
];

quizData.sort(() => Math.random() - 0.5);

let current = 0;
let score = 0;
let time = 15;
let timer;

let used5050 = false;
let usedPhone = false;
let usedAudience = false;

const start = document.getElementById("start-btn");
const land = document.getElementById("landing-screen");
const quiz = document.getElementById("quiz-container");

const q = document.getElementById("question");
const a = document.getElementById("answers");
const n = document.getElementById("next-btn");

start.addEventListener("click", () => {

    land.classList.add("hidden");

    quiz.classList.remove("hidden");

    initialiseLifelines();

    loadQuestion();

});

function loadQuestion() {

    clearInterval(timer);

    time = 15;

    document.getElementById("timer").textContent = time;

    document.getElementById("question-counter").textContent =
        `Question ${current + 1} of ${quizData.length}`;

    document.getElementById("category").textContent =
        quizData[current].category;

    document.getElementById("progress-bar").style.width =
        (current / quizData.length * 100) + "%";

    q.textContent = quizData[current].question;

    a.innerHTML = "";

    quizData[current].answers.forEach((answer, index) => {

        const btn = document.createElement("button");

        btn.className = "answer-btn";
        btn.textContent = answer;

        btn.addEventListener("click", () => {
            selectAnswer(index);
        });

        a.appendChild(btn);

    });

    timer = setInterval(() => {

        time--;

        document.getElementById("timer").textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            revealAnswer(-1);

        }

    }, 1000);
}

function selectAnswer(index) {

    clearInterval(timer);

    revealAnswer(index);
}

function revealAnswer(selected) {

    const correct = quizData[current].correct;

    document.querySelectorAll(".answer-btn").forEach((btn, index) => {

        btn.disabled = true;

        if (index === correct) {
            btn.classList.add("correct");
        }

        if (index === selected && index !== correct) {
            btn.classList.add("wrong");
        }

    });

    if (selected === correct) {
        score++;
    }
}

let fiftyBtn;
let phoneBtn;
let audienceBtn;

function initialiseLifelines() {

    fiftyBtn = document.getElementById("fiftyBtn");
    phoneBtn = document.getElementById("phoneBtn");
    audienceBtn = document.getElementById("audienceBtn");

    console.log("Lifelines initialised");

    fiftyBtn.addEventListener("click", () => {

        if (used5050) return;

        used5050 = true;
        fiftyBtn.disabled = true;

        const correct = quizData[current].correct;

        const buttons =
            document.querySelectorAll(".answer-btn");

        let wrong = [];

        buttons.forEach((btn, index) => {

            if (index !== correct) {
                wrong.push(index);
            }

        });

        wrong.sort(() => Math.random() - 0.5);

        wrong.slice(0, 2).forEach(index => {

            buttons[index].disabled = true;
            buttons[index].style.opacity = "0.25";

        });

    });

    phoneBtn.addEventListener("click", () => {

        if (usedPhone) return;

        usedPhone = true;
        phoneBtn.disabled = true;

        const correct =
            quizData[current].correct;

        const answers =
            quizData[current].answers;

        let selected;

        if (Math.random() < 0.6) {

            selected = correct;

        } else {

            const wrong =
                [0, 1, 2, 3].filter(
                    i => i !== correct
                );

            selected =
                wrong[
                    Math.floor(
                        Math.random() *
                        wrong.length
                    )
                ];

        }

        alert(
            "📞 Phone a Friend\n\n" +
            "Mhmm... I think it is " +
            answers[selected]
        );

    });

    audienceBtn.addEventListener("click", () => {

        if (usedAudience) return;

        usedAudience = true;
        audienceBtn.disabled = true;

        const answers =
            quizData[current].answers;

        const correct =
            quizData[current].correct;

        let percentages = [0, 0, 0, 0];

        percentages[correct] =
            45 + Math.floor(Math.random() * 16);

        let remaining =
            100 - percentages[correct];

        let wrong =
            [0, 1, 2, 3].filter(
                i => i !== correct
            );

        percentages[wrong[0]] =
            Math.floor(remaining * 0.4);

        percentages[wrong[1]] =
            Math.floor(remaining * 0.35);

        percentages[wrong[2]] =
            remaining -
            percentages[wrong[0]] -
            percentages[wrong[1]];

        let result =
            "📊 Ask the Audience\n\n";

        answers.forEach((answer, index) => {

            result +=
                answer +
                ": " +
                percentages[index] +
                "%\n";

        });

        alert(result);

    });

}
n.addEventListener("click", () => {

    current++;

    if (current < quizData.length) {

        loadQuestion();

    } else {

        endQuiz();

    }

});

function endQuiz() {

    document.getElementById("progress-bar").style.width = "100%";

    q.style.display = "none";
    a.style.display = "none";
    n.style.display = "none";

    document.querySelector(".top-bar").style.display = "none";

    document.getElementById("category").style.display = "none";

    document.querySelector(".lifelines").style.display = "none";

    const pct =
        Math.round((score / quizData.length) * 100);

    document
        .getElementById("result")
        .classList.remove("hidden");

    document.getElementById("final-score").textContent =
        `Score: ${score}/${quizData.length} (${pct}%)`;

    document.getElementById("rating").textContent =
        pct >= 90 ? "🏆 Quiz Master" :
        pct >= 75 ? "🌟 Trivia Expert" :
        pct >= 60 ? "👍 Pretty Good" :
        "📚 Better Luck Next Time";
}

function restartQuiz() {
    location.reload();
}
