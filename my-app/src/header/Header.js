import {ReactComponent as GithubIcon} from '../assets/github-mark-white.svg';
import {ReactComponent as LinkedInIcon} from '../assets/linkedin.svg';
import './Header.css';

function Header() {
    return <div id="Header">
      <h1 id="name">Sophie Stone</h1>
      <div id="icons">
        <a href="https://github.com/smstone0"><GithubIcon/></a>
        <a href="https://www.linkedin.com/in/sophie-stone-/"><LinkedInIcon/></a>
      </div>
    </div>
  }

export default Header;