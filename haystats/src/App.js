import logo from './logo-small.png';
import './index.css';

console.log(logo);
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           *Please read the following the voice of the EA Sports guy*
//           <br></br>Click the button below to get stacked with stats
//         </p>
//       </header>
//     </div>
//   );
// }


export default function Popup(){
  return(
    /*attempting a logo*/
    <p>Help me</p>,

    <img logo alt="logo" />,

    /*Titre*/
    <blockquote>
      <h1> Welcome to Haystats! </h1>
    </blockquote>
   );
 };