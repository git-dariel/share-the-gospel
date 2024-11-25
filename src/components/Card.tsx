interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-black text-center mb-4">
        <i className={`${icon} text-3xl`}></i>
      </div>
      <h3 className="text-2xl font-semibold text-black text-center mb-4">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Card;
