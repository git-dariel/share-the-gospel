interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const ResourceCard = ({ title, description, icon, link }: ResourceCardProps) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-black text-center mb-4">
        <i className={`${icon} text-4xl`}></i>
      </div>
      <h3 className="text-2xl font-semibold text-black text-center mb-4">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
    </a>
  );
};

export default ResourceCard;
