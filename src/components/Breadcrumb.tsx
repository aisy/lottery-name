// import {Breadcrumbs, BreadcrumbItem} from '@nextui-org/react';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {usePathname} from 'next/navigation';
import Link from "next/link";
import * as React from 'react';

const BreadCrumb: React.FunctionComponent = () => {

    const paths = usePathname();
    const pathname = paths.split('/').filter(path => path)


    return (
        <div className='flex flex-col flex-wrap gap-4 mb-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    {pathname.map((path, index) => (
                        <div key={index}>
                            <BreadcrumbItem key={index + 1}>{path}</BreadcrumbItem>
                            {index !== pathname.length - 1 ? <BreadcrumbSeparator/> : null}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

        </div>
    );
};

export default BreadCrumb;
