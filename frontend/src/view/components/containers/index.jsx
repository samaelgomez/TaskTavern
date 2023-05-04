const Container = ({ containerTitle, children }) => {
    return (
      <section className="section-wrapper">
        <div className="wrapper-header">
          <span className="title-32">{containerTitle}</span>
          <div className="header-icon"></div>
        </div>
        {children}
      </section>
    );
  };
  
  export default Container;