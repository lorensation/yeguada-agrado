interface PageHeaderProps {
    title: string
    subtitle?: string
  }
  
  const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
      <div className="bg-primary py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">{title}</h1>
        {subtitle && <p className="text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    )
  }
  
  export default PageHeader
  