import { Skeleton } from "../ui/skeleton"
import InvoiceList from "./InvoiceList"

const DashboardSkeleton = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-4">
        {[...Array(4)].map((_, index) => {
          return (
            <Skeleton key={index} className="flex flex-col gap-3 p-4">
              <Skeleton className="h-15 w-15 bg-background"/>
              <Skeleton className="h-7 w-32 bg-background"/>
              <Skeleton className="h-7 w-36 bg-background"/>
            </Skeleton>
          )
        })}
    </div>
      <InvoiceList />
      </div>
  )
}

export default DashboardSkeleton