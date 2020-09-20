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
