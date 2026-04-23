import { Link } from "react-router-dom";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-[#EDEDED] pt-20 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border border-[#3C3C3B] bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-[#F4C709]">
              Payment canceled
            </h2>
            <div className="my-3 h-px w-20 bg-[#3C3C3B]" />
            <p className="mb-6 text-sm text-slate-900">
              No worries, your order was not completed. You can return to the
              shop and try again whenever you want.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="rounded-lg border border-[#3C3C3B] bg-white px-5 py-2 text-sm font-medium text-slate-900 transition hover:border-yellow-300"
              >
                Back to home
              </Link>

              <Link
                to="/winkelwagen"
                className="rounded-lg bg-[#F4C709] px-5 py-2 text-sm font-medium text-slate-900 transition hover:opacity-90"
              >
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
