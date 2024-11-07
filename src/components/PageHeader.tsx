import { PageHeaderPropType } from '@/types'

const PageHeader = ({mainTitle, subTitle}:PageHeaderPropType) => {
  return (
    <div className='mb-5 w-full'>
        <h3 className="text-xl font-semibold text-center">{mainTitle}</h3>
        <p className="text-foreground/70 text-sm text-center">{subTitle}</p>
    </div>
  )
}

export default PageHeader