import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
      <div className="container mx-auto">
        <Header />
        {children}
      </div>
  );}

export default Layout