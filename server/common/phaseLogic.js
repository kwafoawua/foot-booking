exports.shuffleTeamsArray = teamsArray => {
    let m = teamsArray.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // Swap with the current
        t = teamsArray[m];
        teamsArray[m] = teamsArray[i];
        teamsArray[i] = t;
    }
    return teamsArray;
}

exports.incompleteTeamArray = teamArray => {
    if (teamArray.length > 15) return teamArray;
    let phaseMatch = new Array(16);
    for (let i = 0; i < phaseMatch.length; i += 2) {
        phaseMatch[i] = teamArray[0];
        teamArray.shift();
    }
    if (teamArray.length) {
        for (let i = 0; i < teamArray.length; i++) {
            phaseMatch[i + 1] = teamArray[i];
        }
    }
    return phaseMatch;
}
