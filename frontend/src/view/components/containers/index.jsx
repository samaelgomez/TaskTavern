import { GiInfo } from "react-icons/gi";

const Container = ({ containerTitle, children, sectionClassname = "section-wrapper" }) => {
    return (
      <section className={sectionClassname}>
        <div className="wrapper-header">
          <span className="title-32">{containerTitle}</span>
          <div className="header-icon"><GiInfo size={24}/></div>
        </div>
        {children}
      </section>
    );
  };
  
  export default Container;