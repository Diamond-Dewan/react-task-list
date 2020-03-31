import React from 'react';
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TabSwitch from "./components/TabSwitch";
import TodoListContextProvider from "./context/TodoListContext";

function App() {
  return (
      <TodoListContextProvider>
          <CssBaseline/>
          <Container maxWidth='sm'>
              <Header/>
              <TabSwitch/>
          </Container>
      </TodoListContextProvider>
  );
}

export default App;
