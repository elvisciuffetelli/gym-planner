type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className="container lg:px-20 xl:px-48 mx-auto px-2 py-4">{children}</div>
}

export default Layout
