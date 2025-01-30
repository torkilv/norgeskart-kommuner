import React, {useState} from 'react';
import projects from './project_data.js';
import './Projects.css';
import {ReactComponent as LinkIcon} from '../assets/link.svg';
import {ReactComponent as ArrowIcon} from '../assets/arrow-up-right.svg';
import {ReactComponent as CloseIcon} from '../assets/close.svg';
import {ReactComponent as RightArrow} from '../assets/right-arrow.svg';
import {ReactComponent as LeftArrow} from '../assets/left-arrow.svg';

  function Projects() {
    return (
      <div>
        <h2>Projects</h2>
        <div id="projects">
        {projects.map((project, index) => (
            <Project key={index} project={project} />
          ))}
          </div>
      </div>
    )
  }

  function Project({project}) {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
      setModalOpen(!modalOpen)
    }

    return (
      <div class="project">
        {modalOpen && <Modal images={project.moreImages} onClose={toggleModal} project={project}/>}
        <div id="title-date">
          <h3 id="title">{project.title}</h3>
          <p id="date">{project.date}</p>
        </div>
        <div id="image-description">
          <a class="image-container" href={project.url}>
          <img src={project.thumbnail} alt={project.url}></img>
          <MoreImages images={project.moreImages} toggleModal={toggleModal}></MoreImages>
          </a>
          <div class="content">
            <p id="description">{project.description}</p>
            <p id="description-body">{project.detail}</p>
          </div>
        </div>
        <div className='languages-and-links'>
          <div className='languages'>
            {project.languages.map((language, index) => (
              <span key={index} className="language">{language}</span>
            ))}
          </div>
          <div id="code-design">
            <Link text="Code" url={project.codeUrl} />
            <Link text="Design" url={project.designUrl} />
          </div>
        </div>
      </div>

    );
  }

  function MoreImages({images, toggleModal}) {
    return images && images.length > 0 && 
    <span id="more-images" onClick={toggleModal}>+{images.length}<ArrowIcon/></span>
  }

  function Modal({images, onClose, project}) {
    const [index, setIndex] = useState(0);

    const handleClickOutside = (e) => {
      if (e.target.id === 'modal') {
        onClose();
      }
    };

    const indexUpdate = (e) => {
      if(e.target.id === 'previous') {
        setIndex(index === 0 ? images.length - 1 : index - 1);
      } else if (e.target.id === 'next') {
        setIndex(index === images.length - 1 ? 0 : index + 1);
      }
    }
    return <div id="modal" onClick={handleClickOutside}>
      <div id="modal-container">
        <div className="modal-column">
          <div id="title-exit">
            <h2>More images from {project.title}</h2>
            <CloseIcon id="exit" onClick={onClose}/>
          </div>
          <div className="modal-row">
            <div id="modal-image-container">
              <img src={images[index]} alt={`Image ${index + 1}`}></img>
            </div>
            <div id="navigation">
              <p id="image-count">{index+1} of {project.moreImages.length}</p>
              <div id="navigation-buttons">
                <span className="navigation-button" id="previous" onClick={indexUpdate}><LeftArrow/>Previous</span>
                <span className="navigation-button" id="next" onClick={indexUpdate}>Next<RightArrow/></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  function Link({text, url}) {
    return (
      url && (
        <a id="link" href={url}>
          <span><LinkIcon/>{text}</span>
        </a>
        )
    );
  }

export default Projects;