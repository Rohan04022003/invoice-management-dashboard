import { Skeleton } from '../ui/skeleton'

const InvoiceList = () => {
    return (
        <div>
            <Skeleton className="w-full flex flex-col gap-2 p-4">
                <Skeleton className="w-56 h-8 bg-background mb-4" />
                {[...Array(20)].map((_, index) => {
                    return (
                        <Skeleton key={index} className="h-10 w-full bg-background" />
                    )
                })}
            </Skeleton>
        </div>
    )
}

export default InvoiceList