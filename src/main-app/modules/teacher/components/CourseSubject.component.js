import React from "react";
import Button from "../../button/Button.component";
import "./CourseSubject.styles.scss";

export const CourseSubjectComponent = (props) => {
  const { course, subjects } = props;

  return (
    <div>
      <div className="title-line-container">
        <h1 className="title is-3 course-title">{course}</h1>
        <hr
          style={{
            backgroundColor: "gray",
          }}
        />
      </div>

      <div className="level">
        <div className="level-left course-subject ">
          {subjects.map((subject) => (
            <div key={subject.name} className="level-item button-container">
              <Button
                image={subject.image}
                title={subject.name}
                route={subject.route}
              />
            </div>
          ))}
          {/*<div className="level-item button-container">*/}
          {/*  <Button*/}
          {/*    image={geographySvg}*/}
          {/*    title="GEOGRAFÍA"*/}
          {/*    route="/educapp/student"*/}
          {/*  />*/}
          {/*</div>*/}
          {/*<div className="level-item">*/}
          {/*  <Button*/}
          {/*    image={historySvg}*/}
          {/*    title="HISTORIA"*/}
          {/*    route="/educapp/student"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
