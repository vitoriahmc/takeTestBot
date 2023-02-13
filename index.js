const express = require('express');
const app = express();

function getRepositories(username) {
    // The fetch method returns a Promise, which is stored here
    return Promise.resolve(fetch(`https://api.github.com/search/repositories?q=user:${username}+language:csharp`));
}

app.get('/api', (req, res) => {
    let username = "takenet";
    // Using GitHub API to fetch all the repositories from a given username
    var getFiveCSharpRepos = getRepositories(username)
        .then(res => res.json()) // Parsing response to a json
        .then(repos => {
            // Reorder the array to the repos with the oldest created_at date to be first
            repos["items"].sort(function(a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            })
            // Return only the first 5, after reordering by creation date
            return repos["items"].slice(0, 5)
        })
    getFiveCSharpRepos.then(repos => res.json(repos))
})

// Starting
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
