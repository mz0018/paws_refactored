import { CheckCircle } from 'lucide-react'

type MarkCompleteUI = {
    orderId: string
    dateOrdered: Date
    dateCompleted: Date
}

export const MarkCompletedUI = ({
    orderId,
    dateOrdered,
    dateCompleted,
}: MarkCompleteUI) => {
    return (
        <div className="mt-3 rounded-xl border border-btn-black-bg bg-green-50 p-4">
            <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-btn-black-bg" />

                <div>
                    <h3 className="font-semibold text-btn-black-bg">
                        Order Completed
                    </h3>

                    <p className="text-sm text-btn-black-bg">
                        This order has been successfully fulfilled.
                    </p>
                </div>
            </div>

            <div className="my-3 border-t border-btn-black-bg" />

            <div className="grid gap-3 sm:grid-cols-2">
                <div>
                    <p className="text-xs font-medium capitalize tracking-wide text-btn-black-bg">
                        Fulfilled On
                    </p>
                    <p className="text-sm text-btn-black-bg">
                        {dateCompleted.toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium capitalize tracking-wide text-btn-black-bg">
                        Placed On
                    </p>
                    <p className="text-sm text-btn-black-bg">
                        {dateOrdered.toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium capitalize tracking-wide text-btn-black-bg">
                        Order ID
                    </p>
                    <p className="break-all text-sm text-btn-black-bg">
                        {orderId}
                    </p>
                </div>
            </div>
        </div>
    )
}