import logo from "./logo.svg";
import "./App.css";
import { Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
Auth.configure(awsconfig);
API.configure(awsconfig);

function updateTodo(todo, newDesc) {
  todo["description"] = newDesc;
  API.graphql(graphqlOperation(mutations.updateTodo, { input: todo }));
}

function deleteTodo(todo) {
  API.graphql(
    graphqlOperation(mutations.deleteTodo, { input: { id: todo["id"] } })
  );
}

function App() {
  const userTodos =  API.graphql(
    graphqlOperation(queries.listTodos, {filter: { 'name': { eq: "test" } }})
  );
  console.log(userTodos);

  const allTodos = API.graphql(graphqlOperation(queries.listTodos));
  console.log(allTodos);

  const oneTodo = API.graphql(
    graphqlOperation(queries.getTodo, {
      id: "70150cf3-a283-4d8f-9e11-931fd9603edf",
    })
  ).then(function (todo) {
    // updateTodo(todo['data']['getTodo'], "new description")
    // deleteTodo(todo["data"]["getTodo"]);
  });
  console.log(oneTodo);

  //   Auth.currentAuthenticatedUser({
  //     bypassCache: false,
  //   })
  //     .then(function (user) {
  //       console.log("User: " + JSON.stringify(user));
  //       const todo = { name: user["username"], description: "new todo" };
  //       const newTodos = API.graphql(
  //         graphqlOperation(mutations.createTodo, { input: todo })
  //       );
  //     })
  //     .catch((err) => console.log(err));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. OK!
        </p>
        <p>My challenge solution</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
// export default App;
