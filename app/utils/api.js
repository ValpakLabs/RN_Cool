var notes = [
  'note 1',
  'note 2',
  'note 3',
  'note 4',
  'note 5'
];

let api = {
  getBio(username) {
    const url = `https://api.github.com/users/${username.toLowerCase().trim()}`;
    return fetch(url).then(res => res.json());
  },
  getRepos(username) {
    const url = `https://api.github.com/users/${username.toLowerCase().trim()}/repos`;
    return fetch(url).then(res => res.json());
  },
  addNote(username, note) {
    notes = [...notes, note];
    return Promise.resolve(notes)
  },
  getNotes(username) {
    return new Promise((resolve, reject) => {
      resolve(notes)
    })
  }
};

module.exports = api;
