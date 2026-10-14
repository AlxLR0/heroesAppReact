import { Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadCrumb{
    label: string;
    to: string;
}

interface Props{
    currentPage: string;
    breadCrumbs?: BreadCrumb[]
}


export const CustomBreadCrums = ({currentPage, breadCrumbs=[]}:Props) => {
  return (
        <Breadcrumb className='my-5'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                {
                    breadCrumbs.map(crumb =>(
                        <div className="flex items-center">
                            <BreadcrumbItem>
                            <BreadcrumbSeparator>
                            
                            </BreadcrumbSeparator>
                            <BreadcrumbLink >
                                <Link to={crumb.to}>{crumb.label}</Link>
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </div>
                    ))
                }
                 <BreadcrumbItem>
                        <BreadcrumbLink className='text-black'>
                            {currentPage}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                {/* <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem> */}

            </BreadcrumbList>
    </Breadcrumb>
  )
}
