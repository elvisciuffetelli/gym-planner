type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Layout;
