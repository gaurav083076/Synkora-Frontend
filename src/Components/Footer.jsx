const Footer = () => {
  return (
    <footer className="w-full bg-[#00000050] backdrop-blur-md text-white text-center py-3 z-50">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">SYNKORA</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;