const GRADE_C = 'grade-c';
const GRADE_B = 'grade-b';
const GRADE_A = 'grade-a';
const GRADE_S = 'grade-s';
const COMMENT_BANK = new Map([
    [
        GRADE_C,
        [
            'Some birds should not fly.',
            'Boo.',
            'Wow you are bad at this.',
            'That was just sad actually.',
            'Ouchie.',
        ]
    ],
    [
        GRADE_B,
        [
            'Not bad.',
            'Boring.',
            'Not exactly newsworthy.',
            'Meh.',
        ]
    ],
    [
        GRADE_A,
        [
            'Not bad at all!',
            'Good!',
            'You have potential!',
            'Next step is greatness...',
        ]
    ],
    [
        GRADE_S,
        [
            'This bird is on fire!',
            'Your dinosaur ancestors are smiling down upon you :)',
            'God tier.',
            'Simply sublime!',
        ]
    ]
]);

const computeGrade = (score) => {
    if (score < 10) {
        return GRADE_C;
    }
    if (score < 20) {
        return GRADE_B;
    }
    if (score < 50) {
        return GRADE_A;
    }
    return GRADE_S;
};

const score = parseInt(sessionStorage.getItem('score') || '?');
const grade = computeGrade(score);
const commentChoices = COMMENT_BANK.get(grade);
const comment = commentChoices[Math.floor(Math.random() * commentChoices.length)];

document.getElementById('score').innerText = score.toString();
document.getElementById('comment').innerText = comment;
