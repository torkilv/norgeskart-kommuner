import React, {useState} from 'react';
import './Dropdown.css';

function Dropdown({ allTechStacks, selectedTechStacks, onTechStackChange }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
    <div className="dropdown">
      <button className="dropbtn" onClick={toggleDropdown}>Filter Tech Stack</button>
      {dropdownOpen && <div className="dropdown-content">
        {allTechStacks.map((techStack) => (
          <label key={techStack} className="dropdown-item">
            <input
              type="checkbox"
              checked={selectedTechStacks.includes(techStack)}
              onChange={() => onTechStackChange(techStack)}
            />
            {techStack}
          </label>
        ))}
      </div>}
    </div>
  );
}

export default Dropdown;