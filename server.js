
const checkLoggedIn = (req, res, next) => {
  const username = req.cookies.username;

  // Check if username cookie exists and if it matches 'Chenvenom'
  if (username && username === 'Chenvenom') {
    res.redirect('/login'); // Redirect to login if already logged in
  } else {
    next(); // Continue to the login if not logged in
  }
};

//check if the user is logged out
const checkLoggedOut = (req, res, next) => {
  const username = req.cookies.username;

  // Check if username cookie exists and if it matches 'Chenvenom'
  if (username && username === 'Chenvenom') {
    next(); // Continue to the next page if logged in
  } else {
    res.redirect('/'); // Redirect to homepage if not logged in
  }
};

// Homepage route
app.get('/', checkLoggedIn, (req, res) => {
  res.render('home');
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match 
  if (username === 'Chenvenom' && password === 'Chenvenom1989') {
    res.cookie('username', username); // Set the username cookie
    res.redirect('/secondpage.html'); // Redirect to second page on successful login
  } else {
    res.send('Invalid username or password');
  }
});

// login 
app.get('/login', checkLoggedOut, (req, res) => {
  res.render('login');
});

//logout
app.get('/logout', (req, res) => {
  console.log("im logged out");
  res.clearCookie('username'); // Clear the username cookie
  res.redirect('/');
});
// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the provided username and password match the credentials
    if (username === 'Chenvenom' && password === 'Chenvenom1989') {
      res.cookie('username', username); // Set the username cookie
      res.redirect('/secondpage.html'); // Redirect to second page on successful login
    } else {
      res.send('Invalid username or password');
    }
  });
  function logout() {
    fetch('/logout')
      .then(response => {
        if (response.ok) {
          window.location.href = '/'; // Redirect to the homepage after logout
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }



