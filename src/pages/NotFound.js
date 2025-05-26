import Header from '../components/Header.js';
import image from '../assets/404.jpg';

function NotFound() {
    return (
      <div id="Home">
        <div id="Content">
          <header>
            <Header/>
          </header>
          <div id="not-found">
            <h1>Page not found!</h1>
            <img src={image} alt="404" id="not-found-image" />
          </div>
        </div>
    </div>
    );
  }

export default NotFound;