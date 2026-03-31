import { Link } from "react-router-dom";

const PaymentSucceed = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-[#EDEDED] pt-20 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border border-[#3C3C3B] bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-[#F4C709]">
              Payment successful
            </h2>
            <div className="my-3 h-px w-20 bg-[#3C3C3B]" />
            <p className="mb-6 text-sm text-slate-900">
              Thank you for your order. Your payment has been processed
              successfully and we will start handling your order soon.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="rounded-lg bg-[#F4C709] px-5 py-2 text-sm font-medium text-slate-900 transition hover:opacity-90"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucceed;
