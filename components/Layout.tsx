type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
      <div className="container mx-auto px-4 py-2">
        {children}
      </div>
  );}

export default Layout