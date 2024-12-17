function filterSkills(category) {
    const categories = document.querySelectorAll('.skill-category');

    categories.forEach(categoryElement => {
        if (category === 'all') {
            categoryElement.style.display = 'block';
        } else if (categoryElement.classList.contains(category)) {
            categoryElement.style.display = 'block';
        } else {
            categoryElement.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.modal .close');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    // Ajoute un événement à tous les boutons "Voir plus"
    document.querySelectorAll('.voir-plus').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche la navigation

            // Récupère les données du projet
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');

            // Remplit la modale avec les données
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Affiche la modale
            modal.style.display = 'block';
        });
    });

    // Ferme la modale
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Ferme la modale si on clique en dehors
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
// Gestion de la modale
document.querySelectorAll('.voir-plus').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = document.getElementById('project-modal');
        document.getElementById('modal-title').textContent = this.dataset.title;
        document.getElementById('modal-description').textContent = this.dataset.description;
        document.getElementById('modal-image').src = this.dataset.image;
        document.getElementById('modal-link').href = this.dataset.link;
        modal.style.display = 'block';
    });
});

// Fermer la modale
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('project-modal').style.display = 'none';
});

// Fermer la modale si on clique en dehors du contenu
window.addEventListener('click', function (e) {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function rediriger(event) {
    event.preventDefault();
    alert("Merci pour votre message ! Vous allez être redirigé vers la page d'accueil.");
    window.location.href = "../index.html";
}

const questions = [
    { q: "1. Quel est le créateur de Python ?", choices: ["Guido van Rossum", "Brendan Eich", "James Gosling"], correct: "Guido van Rossum" },
    { q: "2. Quel langage est utilisé pour créer des pages web dynamiques ?", choices: ["PHP", "C", "Python"], correct: "PHP" },
    { q: "3. Quel langage est principalement utilisé pour les applications iOS ?", choices: ["Swift", "Java", "C#"], correct: "Swift" },
    { q: "4. Quel langage est appelé le langage de base ?", choices: ["C", "Ruby", "Haskell"], correct: "C" },
    { q: "5. Quel est le langage préféré des data scientists ?", choices: ["Python", "R", "Scala"], correct: "Python" },
    { q: "6. Qui a créé Java ?", choices: ["James Gosling", "Dennis Ritchie", "Ken Thompson"], correct: "James Gosling" },
    { q: "7. Quel langage est utilisé pour développer React ?", choices: ["JavaScript", "TypeScript", "PHP"], correct: "JavaScript" },
    { q: "8. Quel est un framework pour Python ?", choices: ["Django", "Angular", "Laravel"], correct: "Django" },
    { q: "9. Quel langage utilise Node.js ?", choices: ["JavaScript", "Java", "Ruby"], correct: "JavaScript" },
    { q: "10. Quel langage est utilisé pour Flutter ?", choices: ["Dart", "Kotlin", "Java"], correct: "Dart" },
];

let currentIndex = 0;
const questionsPerPage = 3;
const userAnswers = Array(questions.length).fill(null); // Stocke les réponses de l'utilisateur

function renderQuestions() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    const end = Math.min(currentIndex + questionsPerPage, questions.length);

    for (let i = currentIndex; i < end; i++) {
        const question = questions[i];
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `
            <p>${question.q}</p>
            ${question.choices.map(choice => `
                <label>
                    <input type="radio" name="q${i}" value="${choice}" ${
                        userAnswers[i] === choice ? "checked" : ""
                    }>
                    ${choice}
                </label><br>
            `).join("")}
        `;
        questionContainer.appendChild(div);
    }
}

function saveAnswers() {
    const end = Math.min(currentIndex + questionsPerPage, questions.length);
    for (let i = currentIndex; i < end; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        userAnswers[i] = selected ? selected.value : null;
    }
}

function validatePage() {
    const end = Math.min(currentIndex + questionsPerPage, questions.length);
    for (let i = currentIndex; i < end; i++) {
        if (!userAnswers[i]) {
            alert(`Veuillez répondre à toutes les questions avant de continuer.`);
            return false;
        }
    }
    return true;
}

function showResults() {
    saveAnswers(); 
    const modal = document.getElementById("result-modal");
    const scoreElem = document.getElementById("score");
    const feedbackElem = document.getElementById("feedback");
    let score = 0;
    feedbackElem.innerHTML = "";

    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
            feedbackElem.innerHTML += `<p style="color: green;">Question ${index + 1}: Correct (${question.correct})</p>`;
        } else {
            feedbackElem.innerHTML += `<p style="color: red;">Question ${index + 1}: Incorrect (Correct: ${question.correct})</p>`;
        }
    });

    scoreElem.textContent = `Votre score est : ${score} / ${questions.length}`;
    modal.style.display = "block";
}

document.getElementById("next-button").addEventListener("click", () => {
    saveAnswers();
    if (!validatePage()) return;
    currentIndex += questionsPerPage;
    if (currentIndex >= questions.length) {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("validate-button").style.display = "block";
    } else {
        renderQuestions();
    }
});

document.getElementById("validate-button").addEventListener("click", showResults);

document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("result-modal").style.display = "none";
});

renderQuestions();
