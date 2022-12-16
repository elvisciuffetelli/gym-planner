type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className="container mx-auto px-2 py-4">{children}</div>
}

export default Layout
