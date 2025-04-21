import "../style.css";

const List = ({ title, children, type = "ul" }) => {
  const ListTag = type === "ol" ? "ol" : "ul"; // Decide whether to render <ul> or <ol>

  return (
    <div className="list">
      <h3>{title}</h3>
      <ListTag>{children}</ListTag> {/* Render either <ul> or <ol> based on type */}
    </div>
  );
};

export default List;