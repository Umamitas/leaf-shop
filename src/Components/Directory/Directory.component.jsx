import Category from "../Category-items/Category.component";
import "./Directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <Category category={category} />
      ))}
    </div>
  );
};
export default Directory;
