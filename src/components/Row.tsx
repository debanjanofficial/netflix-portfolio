import React from 'react';
import './Row.css';

interface Project {
  id: number;
  name: string;
  poster_path: string;
}

interface RowProps {
  title: string;
  projects: Project[];
}

const Row: React.FC<RowProps> = ({ title, projects }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {projects.map((project) => (
          <img
            key={project.id}
            className="row__poster"
            src={project.poster_path}
            alt={project.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;