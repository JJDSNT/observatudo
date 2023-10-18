import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-10 flex flex-col items-center justify-center text-center" style={{ paddingBottom: '25px' }}>
      <hr className="w-1/3 my-4 border-gray-300" />
      <p className="mb-2">Desenvolvido com <span role="img" aria-label="Coração">❤️</span> dedicação.</p>
      <div className="flex items-center">
        <span style={{ marginRight: '5px' }}>
          <FaGithub />
        </span>
        <a
          href="https://github.com/JJDSNT/observatudo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Código-fonte
        </a>
      </div>
    </footer>
  );
};

export default Footer;
