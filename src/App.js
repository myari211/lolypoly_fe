// import logo from './logo.svg';
// import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "./Component/Configuration/Routes/Routes";
import 'swiper/css/bundle';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function App() {
  const router = createBrowserRouter(routesConfig);
  return <RouterProvider router={router} />
}

export default App;
