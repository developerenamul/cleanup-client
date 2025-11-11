// Category.jsx
const categories = [
  {
    name: "Garbage",
    image:
      "https://bossip.com/wp-content/uploads/sites/28/2022/01/16428705698167.jpg?strip=all&quality=80",
  },
  {
    name: "Illegal Construction",
    image:
      "https://apicms.thestar.com.my/uploads/images/2019/10/22/341080.webp",
  },
  {
    name: "Broken Public Property",
    image: "https://images.mid-day.com/images/images/2025/apr/Footpath-1_d.jpg",
  },
  {
    name: "Road Damage",
    image:
      "https://www.nbmcw.com/images/31-Roads/43960-Repairing-Potholes-1.webp",
  },
];

const Category = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6 my-10">
      {categories.map((c, i) => (
        <div
          key={i}
          className="rounded-xl shadow-lg hover:scale-105 duration-200"
        >
          <img
            src={c.image}
            alt={c.name}
            className="h-40 w-full object-cover rounded-t-xl"
          />
          <h3 className="text-center py-3 font-semibold text-lg">{c.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Category;
