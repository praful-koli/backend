const express = require('express');
const app = express();
const port = 3000;

// Sample user data
const users = [
  { id: '12345', name: 'John Doe', email: 'john@example.com' },
  { id: '67890', name: 'Jane Smith', email: 'jane@example.com' }
];

// Route to handle GET request with path parameter
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find(u => u.id === userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
