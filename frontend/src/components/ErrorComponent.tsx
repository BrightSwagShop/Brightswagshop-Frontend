type ErrorComponentProps = {
  title?: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

const ErrorComponent = ({
  title = "Oeps",
  description,
  actionLabel,
  onAction,
}: ErrorComponentProps) => {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-3xl border border-[#f4c709]/30 bg-white p-8 shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C709]/15 text-2xl text-[#F4C709]">
          !
        </div>

        <h2 className="text-2xl font-bold text-[#3C3C3B]">{title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          {description}
        </p>

        {onAction && actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 inline-flex items-center rounded-full bg-[#3C3C3B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;
