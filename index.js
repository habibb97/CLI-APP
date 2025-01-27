#!/usr/bin/env node

import inquirer from 'inquirer';

const users = [
  { username: 'admin', password: 'password123' }, // Username dan password hardcoded
];

let todos = [];
let loggedInUser = null;

function login() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Enter your username:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        mask: '*',
      },
    ])
    .then((answers) => {
      const user = users.find(
        (u) => u.username === answers.username && u.password === answers.password
      );
      if (user) {
        loggedInUser = user;
        console.log(`\nWelcome, ${user.username}!\n`);
        showMenu();
      } else {
        console.log('\nInvalid username or password. Please try again.\n');
        login();
      }
    });
}

function showMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['Add Todo', 'View Todos', 'Delete Todo', 'Logout', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case 'Add Todo':
          addTodo();
          break;
        case 'View Todos':
          viewTodos();
          break;
        case 'Delete Todo':
          deleteTodo();
          break;
        case 'Logout':
          logout();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit();
      }
    });
}

function addTodo() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'todo',
        message: 'Enter your todo:',
      },
    ])
    .then((answers) => {
      todos.push(answers.todo);
      console.log(`Todo added: ${answers.todo}`);
      showMenu();
    });
}

function viewTodos() {
  console.log('\nYour Todos:');
  if (todos.length === 0) {
    console.log('No todos found.');
  } else {
    todos.forEach((todo, index) => {
      console.log(`${index + 1}. ${todo}`);
    });
  }
  console.log('');
  showMenu();
}

function deleteTodo() {
  if (todos.length === 0) {
    console.log('No todos to delete.');
    showMenu();
    return;
  }

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'todoToDelete',
        message: 'Select a todo to delete:',
        choices: todos.map((todo, index) => `${index + 1}. ${todo}`),
      },
    ])
    .then((answers) => {
      const index = parseInt(answers.todoToDelete.split('.')[0], 10) - 1;
      console.log(`Todo deleted: ${todos[index]}`);
      todos.splice(index, 1);
      showMenu();
    });
}

function logout() {
  loggedInUser = null;
  console.log('\nYou have been logged out.\n');
  login();
}

// Mulai aplikasi dengan login
login();
